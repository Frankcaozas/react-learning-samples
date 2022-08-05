import React, { useEffect, useState } from 'react';
import { useAddStudentMutation, useGetStudentsByIdQuery, useUpdateStudentMutation } from '../store/studentApi';
import './StudentForm.css';

const StudentForm = (props) => {
    const [inputData, setInputData] = useState({
        name: '',
        age: '',
        gender: '男',
        address: ''
    });
    const { data: stuData, isSuccess } = useGetStudentsByIdQuery(props.stuId, {
        skip: !props.stuId,
        refetchOnFocus: true
    });

    const [addStu] = useAddStudentMutation()
    const [updateStu] = useUpdateStudentMutation()
    useEffect(() => {
        if (isSuccess) {
            setInputData(stuData.data.attributes)
        }
    }, [isSuccess])

    const nameChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, name: e.target.value }));
    };

    const ageChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, age: +e.target.value }));
    };

    const genderChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, gender: e.target.value }));
    };

    const addressChangeHandler = (e) => {
        setInputData(prevState => ({ ...prevState, address: e.target.value }));
    };

    const submitHandler = () => {
        addStu(inputData)
        setInputData({
            name: '',
            age: '',
            gender: '男',
            address: ''
        });
    };

    const updateHandler = () => {
        updateStu({
            attributes: inputData,
            id: props.stuId
        })
        props.onCancel();
    };


    return (
        <>
            <tr className="student-form">
                <td><input
                    onChange={nameChangeHandler}
                    value={inputData.name}
                    type="text" /></td>
                <td>
                    <select
                        onChange={genderChangeHandler}
                        value={inputData.gender}
                    >
                        <option value="男">男</option>
                        <option value="女">女</option>
                    </select>
                </td>
                <td><input
                    onChange={ageChangeHandler}
                    value={inputData.age}
                    type="text" /></td>
                <td><input
                    onChange={addressChangeHandler}
                    value={inputData.address}
                    type="text" /></td>
                <td>

                    {props.stuId && <>
                        <button onClick={() => props.onCancel()}>取消</button>
                        <button onClick={updateHandler}>确认</button>
                    </>}
                    {!props.stuId &&
                        <button
                            onClick={submitHandler}
                        >添加
                        </button>
                    }

                </td>
            </tr>
            {/*{loading && <tr>*/}
            {/*    <td colSpan={5}>添加中...</td>*/}
            {/*</tr>}*/}
            {/*{error && <tr>*/}
            {/*    <td colSpan={5}>添加失败</td>*/}
            {/*</tr>}*/}
        </>

    );
};

export default StudentForm;
