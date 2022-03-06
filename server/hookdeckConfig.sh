#!/bin/bash

(./hookdeckService.sh "github" "/services/github/webhook")&
(./hookdeckService.sh "trello" "/services/trello/wbehook")&
sleep 4
wait