import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from './../API/API';

const LogEntryForm = ({ location, onClose }) => {
    const { register, handleSubmit } = useForm();
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const response = await createLogEntry(data);
            onClose();
            console.log(response);
        } catch(error) {
            console.log(error);
            setError(error.message);
        }
        setLoading(false);
    }
    
    return ( 
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            { error ? <h3 className="error">{error}</h3> : null }
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" required ref={register} />
            <label htmlFor="description">description</label>
            <textarea id="description" type="text" name="description" rows="3" ref={register}></textarea>
            <label htmlFor="comments">comments</label>
            <textarea id="comments" type="text" name="comments" rows="3" ref={register}></textarea>
            <label htmlFor="image">image</label>
            <input id="image" type="text" name="image" ref={register} />
            <label htmlFor="visitDate">visit date</label>
            <input id="visitDate" type="date" name="visitDate" ref={register} />
            <button type="submit" disabled={loading}>{loading ? 'Loading...': 'create Entry'}</button>
        </form>
     );
}
 
export default LogEntryForm;