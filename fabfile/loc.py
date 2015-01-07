import os
import json
from fabric.api import local
from fabric.api import task
from fabric.api import settings
from fabric.colors import yellow
import boto
from boto.utils import parse_ts
from boto.s3.key import Key
import hashlib
import requests
from datetime import datetime
from fabric.operations import prompt
from fabric.utils import abort

from . import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

# ----------------------------------------------------------------------------#
# VARIABLES ------------------------------------------------------------------#
# ----------------------------------------------------------------------------#


# paths
base_path   = "./static"
css_path    = base_path + "/css/"
config_path = css_path + "config.rb"
site_url = 'http://www.google.com' # replace this

# sass execs
exec_sass_compile = "compass compile {} -c {} --no-line-comments --trace --force -s compressed"

IGNORED_FILES = (
    '.md',
    '.out',
    '.py',
    '.rb',
    '.scss',
    '.git',
    '.gitignore',
    'fabfile',
    '.sass-cache',
    '.DS_Store',
    'node_modules',
    '.rb',
    'src',
    '.scss',
    'package.json',
    'Gruntfile.js'
)

REWRITE_FILES_RULES = {
    './bin/static/js': './static/js',
}

BASE_DIR = './bin/static/'

# ----------------------------------------------------------------------------#
# TASKS ----------------------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def css_compile():
    """
    compile desktop scss to css; returns an array of css file paths
    """
    local("ps ax | grep [c]ompass | awk '{ print $1 }' | xargs kill -9")
    local("ps ax | grep [s]ass | awk '{ print $1 }' | xargs kill -9")
    print(yellow("\n[CSS] Compiling CSS\n", bold=True))
    local(exec_sass_compile.format(base_path, config_path))


@task
def js_compile():
    local('r.js -o ./static/js/app.build.js')


@task
def clone_project():
    with settings(warn_only=True):
        local('rm -rf ./bin')
    local('mkdir -p ./bin')

    for dirname, _dirnames, filenames in os.walk('.'):
        if [x for x in IGNORED_FILES if x in dirname]:
            continue

        for filename in filenames:
            if ignored_file(filename):
                continue
            source = os.path.join(dirname, filename)
            dest_folder = os.path.join('./bin', dirname)
            dest_file = os.path.join('./bin', source)
            local('mkdir -p {2} && cp {0} {1}'.format(source.replace(' ','\ '), dest_file.replace(' ','\ '), dest_folder.replace(' ','\ ')))


def ignored_file(filename):
    if os.path.isfile(filename) and \
       (os.path.split(filename)[1] in IGNORED_FILES or \
        os.path.splitext(filename)[1] in IGNORED_FILES):
        return True
    elif os.path.isdir(filename) and \
         any(dirname for dirname in walkup_dir(filename) if dirname in IGNORED_FILES):
        return True
    else:
        return False


@task
def killall():
    with settings(warn_only=True):
        local("ps ax | grep [S]impleHTTPServer | awk '{ print $1 }' | xargs kill -9")
        local("ps ax | grep [c]ompass | awk '{ print $1 }' | xargs kill -9")
        local("ps ax | grep [s]ass | awk '{ print $1 }' | xargs kill -9")


@task
def open_site():
    local('open {0}'.format(site_url))


def walkup_dir(dirname):
    cwd = os.path.realpath(os.path.join(__file__, '../..'))
    path = os.path.realpath(dirname)
    while path != cwd:
        path, dirname = os.path.split(path)
        yield dirname


def md5(filename, block_size=2**20):
    md5 = hashlib.md5()
    f = open(filename)
    while True:
        data = f.read(block_size)
        if not data:
            break
        md5.update(data)
    return md5.hexdigest()


def upload_file(asset, pathname, public_read, gzip, max_age=60*10):
    gzip = str(gzip).lower() != 'false'
    headers = {'Cache-Control': 'max-age={}'.format(max_age)}
    if gzip and pathname.lower().endswith(('.js', '.css')):
        local('gzip -9 {0}'.format(pathname))
        local('mv {0}.gz {0}'.format(pathname))
        headers['Content-Encoding'] = 'gzip'
        headers['Content-Type'] = 'application/javascript' if pathname.lower().endswith('.js') else 'text/css'
    asset.set_contents_from_filename(pathname, headers)
    asset.set_acl(public_read and 'public-read' or 'private')


def parse_ts_extended(ts):
    RFC1123 = '%a, %d %b %Y %H:%M:%S %Z'
    rv = None
    try:
        rv = parse_ts(ts)
    except ValueError:
        rv = datetime.strptime(ts, RFC1123)
    return rv

@task
def _deploy_s3(force_all=False,
               ID='',
               key='',
               bucket='',
               public_read=True,
               gzip=False):
    conn = boto.connect_s3(ID, key)
    bucket = conn.get_bucket(bucket)
    for dirname, _dirnames, filenames in os.walk(BASE_DIR):
        if ignored_file(dirname) or any(dirname.startswith(path) for path
                                        in REWRITE_FILES_RULES.itervalues()):
            continue
        destdir = dirname

        for filename in filenames:
            actual_file = os.path.join(dirname, filename)
            pathname = os.path.join(destdir, filename)
            if not ignored_file(pathname):

                pathname = pathname.replace(BASE_DIR,'')
                asset = bucket.get_key(pathname)
                if not asset:
                    asset = Key(bucket)
                    asset.key = pathname
                    upload_file(asset, actual_file, public_read, gzip)
                    print('uploaded {0}'.format(pathname))
                elif force_all or asset.etag[1:-1] != md5(actual_file):
                    upload_file(asset, actual_file, public_read, gzip)
                    print('updated {0}'.format(pathname))
                else:
                    pass
                    print('not modified {0}'.format(pathname))

@task
def create_website(AWS_STORAGE_BUCKET_NAME=None, BRANCH_NAME=None):
    branch = 'static'
    create_branch = True
    with settings(warn_only=True):
        ret = local('git show-ref --verify --quiet refs/heads/{}'.format(branch))
        if ret.succeeded:
            create_branch = False

    dirname      = os.path.join(__file__, '../..')
    app_name     = os.path.split(os.path.realpath(dirname))[1]

    bucket_name  = prompt('Enter S3 bucket name:', default=AWS_STORAGE_BUCKET_NAME)
    app_name     = prompt('Enter Heroku app name:', default=app_name)
    remote_name  = prompt('Enter Heroku remote name:', default=BRANCH_NAME)
    username     = prompt('Enter Basic auth username:')
    password     = prompt('Enter Basic auth password:')
    allowed_addr = prompt('Enter allowed IP addresses:')

    config_vars = {
        'BASIC_AUTH_USERNAME': username,
        'BASIC_AUTH_PASSWORD': password,
        'ALLOWED_ADDR': allowed_addr,
        'AWS_ACCESS_KEY_ID': AWS_ACCESS_KEY_ID,
        'AWS_SECRET_ACCESS_KEY': AWS_SECRET_ACCESS_KEY,
        'AWS_BUCKET_NAME': bucket_name,
    }

    if create_branch:
        local('git checkout --orphan {}'.format(branch))
        local('git rm -rf .')
        local('echo "-e git+https://github.com/rafacv/s3firewall.git#egg=s3firewall\ngunicorn" > requirements.txt')
        local('echo "web: gunicorn -w3 s3firewall:app" > Procfile')
        local('git add Procfile requirements.txt && git commit -m "Deploy static website"')
        local('git push origin {}'.format(branch))

    not_created = True
    while not_created:
        with settings(warn_only=True):
            ret = local('heroku apps:create {} -r {}'.format(app_name, remote_name))
            if ret.failed:
                app_name = prompt('Enter Heroku app name (blank to exit):')
                if not app_name:
                    abort('Heroku app not created.')
            else:
                not_created = False

    local('git push {} {}:master'.format(remote_name, branch))
    local('heroku config:set {} --app {}'.format(
        " ".join(["{}='{}'".format(key, value) for key, value in config_vars.iteritems() if value]),
        app_name,
    ))

def notify_slack(slack_url, site_url):
    slackmessage = "new build up on: <{}>".format(site_url)
    payload={
        "username": "deployerbot",
        "text": slackmessage
    }
    return requests.post(slack_url, data=json.dumps(payload))
