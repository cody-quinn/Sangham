#!/bin/sh

if [[ -d ./venv ]] ; then
  source ./venv/bin/activate
fi

exec gunicorn app.api:app -b 0.0.0.0:8000 -k uvicorn.workers.UvicornWorker -w 4
