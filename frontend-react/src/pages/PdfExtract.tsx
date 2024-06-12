import { Breadcrumbs, Button, Card, CardActions, CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import AppService from "../services/appService";
import { IAppData, ISelectItem } from "../interface/interface";
import Selector from "../components/commons/Selector";
import DocumentUploading from "../components/DocumentUploading";


const documentTypes: ISelectItem[] = [
    { value: 'Bank', title: 'Bank' },
    { value: 'Credit Card', title: 'Credit Card' },
    { value: 'Investment', title: 'Investment' },
    { value: 'Tax Form', title: 'Tax Form' },
    { value: 'Plaid JSON', title: 'Plaid JSON' }
];

const languages: ISelectItem[] = [
    { value: 'English', title: 'English' },
    { value: 'Español', title: 'Español' },
    { value: 'Français', title: 'Français' },
    { value: 'Deutsche', title: 'Deutsche' },
    { value: 'Nederlands', title: 'Nederlands' },
    { value: 'Português', title: 'Português' },
    { value: 'Italiano', title: 'Italiano' },
];

const months: ISelectItem[] = [
    { value: 0, title: 'Process all months' },
    { value: 1, title: 'First Statement' },
    { value: 2, title: '2nd Statement' },
    { value: 3, title: '3rd Statement' },
    { value: 4, title: '4th Statement' },
    { value: 5, title: '5th Statement' },
    { value: 6, title: '6th Statement' },
    { value: 7, title: '7th Statement' },
    { value: 8, title: '8th Statement' },
    { value: 9, title: '9th Statement' },
    { value: 10, title: '10th Statement' },
    { value: 11, title: '11th Statement' },
    { value: 12, title: '12th Statement' },
];

function PdfExtraction() {
    const id = useParams().id || '';

    const [appInfo, setAppInfo] = useState<IAppData>();

    const [docType, setDocType] = useState(documentTypes[0].value);
    const [language, setLanguage] = useState(languages[0].value);
    const [month, setMonth] = useState(months[0].value);


    useEffect(() => {
        AppService.getAppById(id)
            .then(res => {
                setAppInfo(res.data.application);
            })
            .catch(err => {
                console.error('Error getting App by ID', err);
            });
    }, []);

    const handleOptionChange = (event: any, option: string) => {
        switch (option) {
            case 'doc_type':
                setDocType(event.target.value);
                return;
            case 'language':
                setLanguage(event.target.value);
                return;
            case 'month':
                setMonth(event.target.value);
                return;
        }
    }

    return (
        <div className="bg-slate-100">
            <img width={"100%"} src="/images/extract.jpg" alt="extract" />
            <div className="w-full max-w-[1500px] mx-auto p-6">
                <Breadcrumbs className="!my-6" aria-label="breadcrumb">
                    <Link color="inherit" to={"/home"} className="hover:underline uppercase">
                        Home
                    </Link>
                    <Typography color="text.primary">
                        Application
                    </Typography>
                </Breadcrumbs>

                <p>{appInfo?.app_number}</p>

                <div className="w-full flex flex-wrap">
                    <div className="w-[40%] min-w-[300px] px-9 flex flex-col gap-3 text-center align-middle">
                        <h2>Conversion Options</h2>
                        <Card variant="outlined">
                            <CardContent className="px-3 py-6">
                                <Selector
                                    label="Document Type"
                                    value={docType}
                                    handleChange={(e) => handleOptionChange(e, 'doc_type')}
                                    items={documentTypes}
                                />
                                <Selector
                                    label="Languages"
                                    value={language}
                                    handleChange={(e) => handleOptionChange(e, 'language')}
                                    items={languages}
                                />
                                <Selector
                                    label="Month"
                                    value={month}
                                    handleChange={(e) => handleOptionChange(e, 'month')}
                                    items={months}
                                />
                                <FormGroup className="my-3">
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Run PDF + text recognition(OCR)"
                                    />
                                </FormGroup>

                                <FormGroup className="my-3">
                                    <p className="text-left">Only Convert Certain PDF Pages</p>
                                    <div className="flex justify-between gap-3">
                                        <TextField id="outlined-basic" placeholder="From Page" variant="outlined" />
                                        <TextField id="outlined-basic" placeholder="To Page" variant="outlined" />
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox defaultChecked />}
                                        label="Find Untrue transaction"
                                    />
                                </FormGroup>

                            </CardContent>
                        </Card>
                    </div>
                    <div className="w-[60%] min-w-[500px] px-9 flex flex-col gap-3 text-center align-middle">
                        <h2>Convert Documents</h2>
                        <DocumentUploading />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PdfExtraction;
