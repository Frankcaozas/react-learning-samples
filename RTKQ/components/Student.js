import React, { useCallback, useContext, useState } from 'react';
import { useDeleteStudentMutation } from '../store/studentApi';
import StudentForm from "./StudentForm";

const Student = (props) => {

    const [isEdit, setIsEdit] = useState(false);

    const [delStu, { isSuccess }] = useDeleteStudentMutation()


    const deleteHandler = () => {
        delStu(props.stu.id)
    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <>
            {!isEdit && !isSuccess &&
                <tr>
                    <td>{props.stu.attributes.name}</td>
                    <td>{props.stu.attributes.gender}</td>
                    <td>{props.stu.attributes.age}</td>
                    <td>{props.stu.attributes.address}</td>
                    <td>
                        <button onClick={deleteHandler}>删除</button>
                        <button onClick={() => setIsEdit(true)}>修改</button>

                    </td>
                </tr>
            }
            {isSuccess &&
                <td colSpan="5">
                    数据已删除！
                </td>}
            {isEdit && <StudentForm stuId={props.stu.id} onCancel={cancelEdit} />}

            {/*{loading && <tr>*/}
            {/*    <td colSpan={5}>正在删除数据...</td>*/}
            {/*</tr>}*/}
            {/*{error && <tr>*/}
            {/*    <td colSpan={5}>删除失败...</td>*/}
            {/*</tr>}*/}
        </>

    );
};

export default Student;
