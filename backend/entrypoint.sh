#!/bin/bash

nohup node /app/backend/dist/main.js >> /app/backend/run.log 2>&1 &
