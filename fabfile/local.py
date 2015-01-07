from fabric.api import task

from . import loc


# ----------------------------------------------------------------------------#
# Project Compile ------------------------------------------------------------#
# ----------------------------------------------------------------------------#


@task
def compile(force_all=False):
    loc.css_compile();
    loc.clone_project();
    loc.js_compile()

