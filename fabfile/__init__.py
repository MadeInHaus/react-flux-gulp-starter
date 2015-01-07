from fabric.api import env

import staging, dev, local, production

import os

AWS_ACCESS_KEY_ID = os.environ.get('AWS_ACCESS_KEY_ID', '')
AWS_SECRET_ACCESS_KEY = os.environ.get('AWS_SECRET_ACCESS_KEY', '')

env.roldefs = {
               'staging': [''],
               'production': ['']
}

env.use_ssh_config = True


