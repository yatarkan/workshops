[Unit]
Description=DL Workbench
After=docker.service
BindsTo=docker.service
ReloadPropagatedFrom=docker.service

[Service]
Restart=always
ExecStart=/bin/bash /home/workbench/start_workbench.sh

[Install]
WantedBy=multi-user.target
