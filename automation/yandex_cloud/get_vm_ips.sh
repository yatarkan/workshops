# Collect VM IP Addresses

VM_NAME_PREFIX=workbench-workshop-vm

IP_REGEXP='[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'


VM_LINES=$(yc compute instance list | grep ${VM_NAME_PREFIX})
# VM_LINES=$(yc compute instance list | grep "work")

echo "${VM_LINES}" | while read -r line ; do
  # line="| fhm6o49kj5tunfr41ijp | dlworkbench-1       | ru-central1-a | RUNNING | 178.154.220.71 | 10.128.0.16 |"
  # echo ${line} | grep 'RUNNING'
  RUNNING_VM_LINE=$(echo ${line} | grep 'RUNNING')
  # echo "line: ${RUNNING_VM_LINE}"
  if [ ! -z "${RUNNING_VM_LINE}" ]; then
    echo ${line} | grep -o ${IP_REGEXP} | head -1
  fi
done

# yc compute instance list | grep RUNNING | sed -n 's/.* | \([0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\).*/\1/p;1q'