# Run DL Workbench as Unix service on Ubuntu 18
1. Copy `automation/unix_service/dl-workbench.service` to `/etc/systemd/system/dl-workbench.service`:
```shell
sudo cp automation/unix_service/dl-workbench.service /etc/systemd/system/dl-workbench.service
```
2. Copy `automation/run.sh` to `/home/workbench/start_workbench.sh`:
```shell
cp automation/unix_service/run.sh /home/workbench/start_workbench.sh
```

3. Start the service:
```shell
sudo systemctl daemon-reload
sudo systemctl enable dl-workbench.service
sudo systemctl start dl-workbench
sudo systemctl status dl-workbench
```

4. Wait while DL Workbench starts.
5. Open the link to DL Workbench in a browser
6. To see logs use the following command:
```shell
sudo journalctl -f -n 1000 -u dl-workbench
```
