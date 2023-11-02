import { Modal, Form, Input, Col, message, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import {
  getPessoa,
  postPessoa,
  updatePessoa,
} from '../../../hooks/services/axios/pessoaService';
import FormItem from 'antd/es/form/FormItem';
import { useAxiosSICAD } from '../../../hooks/useAxiosSICAD';

require('../index.css');

type Props = {
  updatePessoaList: any;
  id: string;
  frequenciaId: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalPessoa = ({
  updatePessoaList,
  id,
  frequenciaId,
  closeModal,
  openModal,
}: Props) => {
  const [form] = Form.useForm();
  const apiAxiosSicad = useAxiosSICAD();

  const [unidades, setUnidades] = useState('');
  const [selectCpf, setSelectedCpf] = useState('');
  const [pessoas, setPessoas] = useState<any[]>([]);

  useEffect(() => {
    loadingPessoa();
    loadingAllPessoa();
  }, [id]);

  useEffect(() => {
    loadingPessoa();
    loadingAllPessoa();
  }, []);

  useEffect(() => {
    if (openModal) {
      loadingAllPessoa();
      loadingPessoa();
    }
  }, [openModal]);

  async function loadingAllPessoa() {
    const response = await getPessoa(`pessoa`);
    if (response !== false) {
      const filteredPessoa = response.data.filter((pessoa: any) => {
        return pessoa.frequencia && pessoa.frequencia.id === frequenciaId;
      });
      setPessoas(filteredPessoa);
      //chamar os selects
    } else {
      message.error('Ocorreu um erro inesperado ao obter os dados.');
    }
  }

  async function loadingPessoa() {
    if (id) {
      await getPessoa(`pessoa/${id}`).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            cpf: response.data.cpf,
            situacao: response.data.situacao,
            faltas: response.data.faltas,
            regional: response.data.regional,
            observacao: response.data.observacao,
            unidade_policial: response.data.unidade_policial,
            cargo: response.data.cargo,
            frequencia: response.data.frequencia,
            position: response.data.position,
          });
        } else {
          message.error('Ocorreu um erro inesperado ao obter os dados.');
        }
      });
    }
  }
  const handleOk = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(() => {
        const formData = form.getFieldsValue(true);
        if (id) {
          submitUpdate();
        } else {
          loadingAllPessoa();

          const lastPosition = pessoas.reduce((maxPosition, pessoa) => {
            return pessoa.position > maxPosition
              ? pessoa.position
              : maxPosition;
          }, 0);

          formData.position = lastPosition + 1;
          submitCreate();
        }
        form.resetFields();
        closeModal(true);
      })
      .catch(errorInfo => message.error('Erro no preenchimento dos campos.'));
  };

  const submitUpdate = async () => {
    const editingPessoa = form.getFieldsValue(true);
    await updatePessoa(editingPessoa, id);
    updatePessoaList(editingPessoa);
  };

  const submitCreate = async () => {
    const editingPessoa = form.getFieldsValue(true);

    await postPessoa(editingPessoa);
    updatePessoaList(editingPessoa);
    setPessoas(prePessoas => [...prePessoas, editingPessoa]);
  };

  function handleSelectCpf(value: any) {
    setSelectedCpf(value);
  }

  const handleUnidadesPCResponse = async () => {
    try {
      const axiosSICAD = useAxiosSICAD();
      const response = await axiosSICAD.unidadesPC();

      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Modal
        visible={openModal}
        title="Pessoa"
        okText="Salvar"
        width={800}
        onCancel={() => {
          form.resetFields();
          closeModal(false);
        }}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
          <Row>
            <Col offset={2} span={12}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o nome ',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={6}>
              <Form.Item
                name="cpf"
                label="CPF"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o CPF ',
                  },
                ]}
                hasFeedback
              >
                {/*<Select
                  showSearch
                  placeholder={'Selecione a Classificação'}
                  onChange={value => handleSelectCpf(value)}
                  value={selectCpf}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { label: 'Nenhum', value: null }, // Opção vazia
                    { label: '1', value: 1111111111 }, // Opção vazia
                  ]}
                ></Select>*/}
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={12}>
              <Form.Item
                name="unidade_policial"
                label="Unidade policial"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a unidade policial ',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={6}>
              <Form.Item
                name="cargo"
                label="Cargo"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o cargo ',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={12}>
              <Form.Item name="situacao" label="Situação" hasFeedback>
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={6}>
              <Form.Item
                name="regional"
                label="Regional"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a regional ',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={2} span={12}>
              <Form.Item name="observacao" label="Observação" hasFeedback>
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={6}>
              <Form.Item name="faltas" label="Faltas" hasFeedback>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <FormItem
            name="frequencia"
            className="hidden"
            initialValue={frequenciaId}
          ></FormItem>
        </Form>
        <Form layout="vertical" form={form}></Form>
      </Modal>
    </>
  );
};

export default ModalPessoa;
