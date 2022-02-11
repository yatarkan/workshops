# Start VM

VM_NAME_PREFIX=workbench-workshop-vm

VM_NUMBER=1

VM_LINES=$(yc compute instance list | grep ${VM_NAME_PREFIX})

VM_NAME_REGEXP="${VM_NAME_PREFIX}-[0-9]\+"

echo "${VM_LINES}" | while read -r line ; do
  # line="| fhm6o49kj5tunfr41ijp | dlworkbench-1       | ru-central1-a | RUNNING | 178.154.220.71 | 10.128.0.16 |"
  # echo ${line} | grep 'RUNNING'
  STOPPED_VM_LINE=$(echo ${line} | grep 'STOPPED')
  # echo "line: ${RUNNING_VM_LINE}"
  if [ ! -z "${STOPPED_VM_LINE}" ]; then
    VM_NAME=$(echo ${line} | grep -o ${VM_NAME_REGEXP} | head -1)

    echo "Starting virtual machine ${VM_NAME} ..."
    
    yc compute instance start \
      --name ${VM_NAME} \
      --async
  fi
done

# for i in $(seq 1 ${VM_NUMBER}); do
#   VM_NAME="${VM_NAME_PREFIX}-${i}"
#   echo "Starting virtual machine ${VM_NAME} ..."
#   yc compute instance start \
#     --name ${VM_NAME} \
#     --async
# done

echo "Triggered starting of ${VM_NUMBER} virtaul machines"
