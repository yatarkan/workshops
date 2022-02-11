FROM openvino/workbench_private:latest_release_2022.1

USER root

RUN apt update && \
    apt install git ffmpeg -y && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

ADD workshops/2022_opentalksai_nlp/requirements.txt /nlp_requirements.txt

RUN source ${NOTEBOOKS_VENV}/bin/activate && \
    pip uninstall opencv-python -y && \
    pip install -r /nlp_requirements.txt


ADD start_jupyter.sh /opt/intel/openvino_2022/tools/workbench/docker/scripts/start_jupyter.sh
ADD ubuntu20.tgz /opt/intel/openvino_2022/

USER workbench