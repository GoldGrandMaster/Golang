export interface IAppData {
    id: number;
    owner: string;
    app_number: string;
    created_at: number;
    statements: number;
    app_status: number;
};

export interface ILoginData {
    user: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
};

export interface IRegisterData {
    email: FormDataEntryValue | null,
    username: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
};

export interface IAppColumn {
    id: 'owner' | 'app_number' | 'created_at' | 'statements' | 'app_status';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
    format?: (value: number) => string;
}

export interface ISelectItem {
    value: any;
    title: string;
}

export interface ISelectProps {
    label: string;
    value: any;
    handleChange: (event: any, child: any) => void;
    items: ISelectItem[];
    className?: string;
}
