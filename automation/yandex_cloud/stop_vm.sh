# Start VM

VM_NAME_PREFIX=workbench-workshop-vm

VM_NUMBER=1

for i in $(seq 1 ${VM_NUMBER}); do
  VM_NAME="${VM_NAME_PREFIX}-${i}"
  echo "Stopping virtual machine ${VM_NAME} ..."
  yc compute instance stop \
    --name ${VM_NAME} \
    --async
done

echo "Triggered stopping of ${VM_NUMBER} virtaul machines"
