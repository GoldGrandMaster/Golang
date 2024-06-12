import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone'

import DocumentService from '../services/documentService';

const DocumentUploading = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setSelectedFile(acceptedFiles[0]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setUploadStatus('Uploading...');
            const response = await DocumentService.fileUplaod(formData);
            console.log('response', response);
            setUploadStatus('Upload successful');
        } catch (error) {
            setUploadStatus('Upload failed');
        }
    };

    return (
        <div className="p-4 flex flex-col gap-3">
            <div className='flex flex-col justify-center gap-3'>
                <input
                    accept=".pdf,.docx,.csv,.xlsx"
                    className='hidden'
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                />

                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed px-4 py-12 text-center ${isDragActive ? 'border-purple-600 bg-gray-200' : 'border-blue-100'}`}
                >
                    <input {...getInputProps()} />
                    <img src='/images/upload.png' className='mx-auto w-36 my-3' alt='upload' />
                    {isDragActive ? (
                        <p className='text-lg font-semibold'>Drop the file here ...</p>
                    ) : (
                        <p className='text-lg font-semibold'>Drag & drop a file here, or click to select a file</p>
                    )}
                </div>

                {/* <label htmlFor="file-input">
                    <Button variant="contained" color="primary" component="span" className="mr-4">
                        Choose File
                    </Button>
                </label> */}

                <Button
                    variant="contained"
                    color="primary"
                    className='p-3 !font-bold !text-lg'
                    onClick={handleUpload}
                    disabled={!selectedFile}
                >
                    Upload
                </Button>
                {uploadStatus && <p>{uploadStatus}</p>}
            </div>
            <p className='text-xl text-green-700 font-semibold'>
                {selectedFile?.name}
            </p>
        </div>
    );
};

export default DocumentUploading;
