# This file will contain
# - a description of this project template
# - the list of variables to be substituted
# - the commands to be launched after copying the template files (e.g. git pull)

# Also, this file will NOT be copied
import os
from random import choice
from string import ascii_letters, ascii_lowercase, digits
import json

def init_git():
    # Only init git if it isn't already there.
    if not os.path.exists('.git'):
        os.system("git init")

def get_replace_vars(no_prompt=False):
    # defaults should be documented
    defaults = (
        {
         'var_name': 'BUCKET_NAME',
         'default': 'asset-bucket',
         'doc': 'Name of AWS bucket for this project.',
        },
    )
    replace = {}

    # Take defaults from frontend package if available
    if os.path.exists('package.json'):
        with open('package.json') as fp:
            j = json.load(fp)
            config = j.get('config', {})
            defaults.update(config.get('vars', {}))

    for info in defaults:
        var = info['var_name']
        default = info['default']

        placemark = '__%s__' % var
        replace[placemark] = None
        help = var.replace('_', ' ')
        while not replace[placemark]:
            if no_prompt:
                replace[placemark] = default
            else:
                prompt = '\n%s\n%s [%s]: ' % (info['doc'], help, default)
                replace[placemark] = raw_input(prompt) or default

    # Always replace secret key
    key_seed = ''.join([choice(ascii_lowercase + digits) for x in range(50)])
    replace['__SECRET_KEY_SEED__'] = key_seed
    return replace

def replace_vars(replace, *base_dirs):
    # Only run replacement on files in project
    for d in base_dirs:
        for root, dirs, files in os.walk(d):
            DONT_REPLACE_IN = ['.svn', '.git',]
            for folder in DONT_REPLACE_IN:
                if folder in dirs:
                    dirs.remove(folder)
            for name in files:
                filepath = os.path.join(root, name)
                with open(filepath, 'r') as f:
                    data = f.read()
                for old_val, new_val in replace.items():
                    data = data.replace(old_val.encode('utf-8'), new_val.encode('utf-8'))
                with open(filepath, 'w') as f:
                    f.write(data)

def after_copy(no_prompt=False, no_git=False):
    if not no_git:
        init_git()

    # Replace variables with prompt values or defaults
    replace = get_replace_vars(no_prompt=no_prompt)
    replace_vars(replace, 'fabfile')
