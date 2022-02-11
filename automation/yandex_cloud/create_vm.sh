# Create VM

VM_NAME_PREFIX=workbench-workshop-vm

DISK_NAME_PREFIX=workbench-workshop-disk

DISK_SNAPSHOT_NAME=dl-workbench-ssd

SUBNET_NAME=default-ru-central1-a
ZONE_NAME=ru-central1-a

PUBLIC_KEY_PATH=
# --metadata-from-file user-data=metadata.yaml \

VM_NUMBER=14

for i in $(seq 1 ${VM_NUMBER}); do
  VM_NAME="${VM_NAME_PREFIX}-${i}"
  
  echo "Creating virtual machine ${VM_NAME} ..."
  
  yc compute instance create \
    --name ${VM_NAME} \
    --network-interface subnet-name=${SUBNET_NAME},nat-ip-version=ipv4 \
    --zone ${ZONE_NAME} \
    --ssh-key ${PUBLIC_KEY_PATH} \
    --create-boot-disk name=${DISK_NAME_PREFIX}-${i},snapshot-name=${DISK_SNAPSHOT_NAME},type=network-ssd \
    --platform 'standard-v3' \
    --memory 16 \
    --cores 4 \
    --core-fraction 100 \
    --service-account-name 'workbench' \
    --preemptible \
    --async
done

echo "Triggered creation of ${VM_NUMBER} virtual machines"
