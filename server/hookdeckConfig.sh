#!/bin/bash

(./hookdeckService.sh "github" "/services/github/webhook")&
sleep 4
wait