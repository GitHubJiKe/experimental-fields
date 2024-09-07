import { memo } from 'react';
import { Handle, Position, useNodeId, useNodes, useStoreApi } from '@xyflow/react';
import { Table } from 'antd';

const { Top, Bottom, Left, Right } = Position;




const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];

// @ts-ignore
export default memo(({ data }) => {
    const { label, isRoot, dataSource } = data;

    const nodes = useNodes()
    const id = useNodeId()
    const store = useStoreApi()




    const onRow = (row: any) => {
        return {
            onClick: () => {
                const curNode = nodes.find(node => node.id === id)
                console.log(row, id, nodes);
                if (curNode) {
                    curNode.hidden = true
                    store.getState().fitViewSync()
                }
            }
        }
    }


    return (
        <div className="" style={{ width: 400, height: 300 }}>

            {!isRoot && <div><Handle
                type="target"
                position={Left}
                id={id!}
            />{id}</div>}
            <Table title={() => label} onRow={onRow} dataSource={dataSource} style={{ height: 300, border: '2px solid red' }} >
                {columns.map(col => {
                    return <Table.Column key={col.key} dataIndex={col.dataIndex} title={col.title} align='right' render={(text, record) => {
                        return <div>
                            {text}
                            {
                                col.dataIndex === 'address' && <div>
                                    <Handle
                                        type="source"
                                        position={Right}
                                        id={record.key + Right}
                                    />
                                    {record.key + Right}
                                </div>
                            }

                        </div>
                    }}></Table.Column>
                })}
            </Table>
        </div>
    );
});

