from fabric.api import local
from fabric.api import task

from . import loc, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY



# ----------------------------------------------------------------------------#
# VARIABLES ------------------------------------------------------------------#
# ----------------------------------------------------------------------------#

BRANCH_NAME = 'dev'
AWS_STORAGE_BUCKET_NAME = '__BUCKET_NAME__' # Replace this with S3 bucket name
PUBLIC_READ = True
SLACK_URL = None


# ----------------------------------------------------------------------------#
# PRODUCTION DEPLOMENT -------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def deploy(force_all=False, gzip=False):
    current_branch = local('git rev-parse --abbrev-ref HEAD', capture=True)
    if current_branch != BRANCH_NAME:
        print('not on the right branch, you are on %s', current_branch)
        return
    loc.css_compile();
    loc.clone_project();
    loc.js_compile()
    loc._deploy_s3( force_all=force_all,
                    ID=AWS_ACCESS_KEY_ID,
                    key=AWS_SECRET_ACCESS_KEY,
                    bucket=AWS_STORAGE_BUCKET_NAME,
                    public_read=PUBLIC_READ,
                    gzip=gzip)
    if SLACK_URL:
        loc.notify_slack(SLACK_URL, 'http://s3.amazonaws.com/{}/index.html'.format(AWS_STORAGE_BUCKET_NAME))



