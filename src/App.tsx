/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Fix: Import React hooks to resolve 'Cannot find name' errors.
import React, { useState, useCallback, useRef, useEffect } from 'react';
import './index.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import BannerAnimado from './BannerAnimado';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_MIME_TYPES = [
  'application/zip',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/msword' // .doc
];
const ALLOWED_EXTENSIONS_STRING = '.zip,.pdf,.docx,.doc';

// Contract Interfaces
interface LogEntry {
    user: string;
    action: string;
    timestamp: string;
}
interface Contract {
    id: number;
    filename: string;
    file_url: string; // URL from Vercel Blob
    uploaded_by: string;
    upload_date: string;
    file_size: number;
    metadata: Record<string, string>;
    activity_log: LogEntry[];
}

// Stats Interface
interface DashboardStats {
    totalContracts: number;
    totalSize: number;
    activeUsers: number;
    contractsByUser: { user: string; count: number }[];
}


// Helper function to format file size
const formatBytes = (bytes: number, decimals = 2): string => {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// SVG Icon Components
const UploadCloudIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="dropzone-icon">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
    </svg>
);
const FileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="file-icon">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zM16 18H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
    </svg>
);
const XIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
);
const FileTextIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
);
const UsersIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
);
const DatabaseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 6c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zm0 6c-4.42 0-8 1.79-8 4s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4z"/></svg>
);
const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
);
const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
);
const ChevronLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
);
const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
);
const PencilIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
);
const TrashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
);
const MailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const EyeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const EyeOffIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>
);


// Modal Component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    <button onClick={onClose} className="modal-close-btn" aria-label="Fechar modal"><XIcon /></button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};


// Toast Component
const Toast: React.FC<{ message: string | null; type: 'error' | 'success' }> = ({ message, type }) => {
  if (!message) return null;
  return <div className={`toast ${type}`}>{message}</div>;
};

// Login Screen Component
const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onLogin();
    };

    return (
        <div className="login-container">
            <header className="header">
                 <img src="/assets/Banner.png" alt="INFOCO Banner" className="login-banner" />
                <h1>Bem-Vindo Ao Portal De Contratos Da INFOCO GESTÃO PÚBLICA</h1>
                <p>Selecione sua cidade e faça login para continuar.</p>
            </header>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <select id="city" name="city" required defaultValue="">
                        <option value="" disabled>Selecione uma cidade</option>
                        <option value="ibicarai">IBICARAÍ</option>
                        <option value="almadina">ALMADINA</option>
                        <option value="saj">SAJ</option>
                        <option value="itamaraju">ITAMARAJU</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" required placeholder="********" />
                </div>
                <button type="submit" className="upload-btn login-btn">Entrar</button>
            </form>
        </div>
    );
};

// Uploader Component
const Uploader: React.FC<{ onUploadComplete: () => void }> = ({ onUploadComplete }) => {
    const [files, setFiles] = useState<File[]>([]);
    const [progress, setProgress] = useState<{ [key: string]: number }>({});
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 3800);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const validateFile = (file: File): boolean => {
        if (file.size > MAX_SIZE_BYTES) {
            setError(`Arquivo "${file.name}" excede o limite de ${MAX_SIZE_MB}MB.`);
            return false;
        }
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        if (!ALLOWED_MIME_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS_STRING.includes(fileExtension)) {
            setError(`Tipo de arquivo "${file.name}" não é permitido.`);
            return false;
        }
        return true;
    };

    const handleFiles = useCallback((newFiles: FileList | null) => {
        if (!newFiles) return;

        setError(null);
        let allValid = true;
        const filesArray = Array.from(newFiles);

        for (const file of filesArray) {
            if (!validateFile(file)) {
                allValid = false;
                break;
            }
        }
        if (!allValid) return;

        const uniqueFiles = filesArray.filter(
            (file) => !files.some((existingFile) => existingFile.name === file.name && existingFile.size === file.size)
        );

        setFiles((prevFiles) => [...prevFiles, ...uniqueFiles]);
        setProgress(prevProgress => {
            const newProgress = { ...prevProgress };
            uniqueFiles.forEach(f => { newProgress[f.name] = 0; });
            return newProgress;
        });
    }, [files]);
    
    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.add('drag-active');
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-active');
    }, []);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-active');
        handleFiles(event.dataTransfer.files);
    }, [handleFiles]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(event.target.files);
        if (event.target) event.target.value = '';
    };

    const removeFile = (fileName: string) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
        setProgress(prevProgress => {
            const newProgress = { ...prevProgress };
            delete newProgress[fileName];
            return newProgress;
        });
    };

    const handleUpload = () => {
        if (files.length === 0 || isUploading) return;
        setIsUploading(true);
        setError(null);

        const uploadPromises = files.map(file => {
            setProgress(prev => ({ ...prev, [file.name]: 0 }));
            
            return new Promise<void>((resolve, reject) => {
                const interval = setInterval(() => {
                    setProgress(prev => {
                        const currentProgress = prev[file.name] || 0;
                        const nextProgress = Math.min(currentProgress + 10, 95);
                        return { ...prev, [file.name]: nextProgress };
                    });
                }, 200);

                fetch(`/api/upload?filename=${encodeURIComponent(file.name)}&uploaded_by=Administrador`, {
                    method: 'POST',
                    body: file,
                }).then(res => {
                    clearInterval(interval);
                    if (!res.ok) {
                        res.json().then(err => reject(new Error(err.error || `Falha no upload de ${file.name}`)));
                    } else {
                        setProgress(prev => ({ ...prev, [file.name]: 100 }));
                        resolve();
                    }
                }).catch(err => {
                    clearInterval(interval);
                    reject(err);
                });
            });
        });
        
        Promise.all(uploadPromises).then(() => {
            setTimeout(() => {
                setIsUploading(false);
                onUploadComplete();
                setFiles([]);
                setProgress({});
            }, 500);
        }).catch(err => {
            setError((err as Error).message);
            setIsUploading(false);
        });
    };

    const allFilesUploaded = files.length > 0 && files.every(f => progress[f.name] === 100);

    return (
        <>
            <div
                className="dropzone"
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                aria-label="File upload dropzone"
                tabIndex={0}
            >
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    accept={ALLOWED_EXTENSIONS_STRING}
                    style={{ display: 'none' }}
                />
                <div className="dropzone-content">
                    <UploadCloudIcon />
                    <p className="dropzone-text">
                        <strong>Clique para enviar</strong> ou arraste e solte
                    </p>
                    <p className="dropzone-hint">
                        ZIP, PDF, DOC, DOCX (máx {MAX_SIZE_MB}MB)
                    </p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="file-list">
                    {files.map((file) => (
                        <div key={`${file.name}-${file.lastModified}`} className="file-item">
                            <FileIcon />
                            <div className="file-details">
                                <span className="file-name">{file.name}</span>
                                <span className="file-size">{formatBytes(file.size)}</span>
                                {(isUploading || progress[file.name] > 0) && (
                                    <div className="progress-bar">
                                        <div className="progress-bar-inner" style={{ width: `${progress[file.name] || 0}%` }}></div>
                                    </div>
                                )}
                            </div>
                            {!isUploading && !allFilesUploaded && (
                                <button onClick={() => removeFile(file.name)} className="remove-file-btn" aria-label={`Remove ${file.name}`}>
                                    <XIcon />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {files.length > 0 && (
                <footer className="actions">
                    <button className="upload-btn" onClick={handleUpload} disabled={isUploading || allFilesUploaded}>
                        {isUploading ? 'Enviando...' : allFilesUploaded ? 'Enviado!' : `Enviar ${files.length} arquivo(s)`}
                    </button>
                </footer>
            )}
            <Toast message={error} type="error" />
        </>
    );
};

// Email Sender Component
const EmailSender: React.FC<{ setToast: (toast: { message: string; type: 'success' | 'error' } | null) => void }> = ({ setToast }) => {
    const [recipientEmail, setRecipientEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [serviceLink, setServiceLink] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        let formattedCpf = value;
        if (value.length > 3) formattedCpf = `${value.slice(0, 3)}.${value.slice(3)}`;
        if (value.length > 6) formattedCpf = `${formattedCpf.slice(0, 7)}.${value.slice(6)}`;
        if (value.length > 9) formattedCpf = `${formattedCpf.slice(0, 11)}-${value.slice(9)}`;
        setCpf(formattedCpf.slice(0, 14));
    };

    const resetForm = () => {
        setRecipientEmail('');
        setCpf('');
        setServiceLink('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ recipientEmail, cpf, serviceLink })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Falha ao enviar o email.');
            }
            
            setToast({ message: 'Email enviado com sucesso!', type: 'success' });
            resetForm();

        } catch (error) {
            setToast({ message: (error as Error).message, type: 'error' });
        } finally {
            setIsSending(false);
        }
    };

    const emailBodyPreview = `
Dados de Login
-------------------------
LOGIN: ${cpf || 'INSIRA SEU CPF'}
SENHA: 123456

Acesse o serviço através do link abaixo:
${serviceLink || 'https://...'}`;

    return (
        <div className="email-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="recipientEmail">Email do Destinatário</label>
                    <input type="email" id="recipientEmail" value={recipientEmail} onChange={e => setRecipientEmail(e.target.value)} required placeholder="email.dousuario@exemplo.com" />
                </div>
                 <div className="form-group">
                    <label htmlFor="cpf">CPF</label>
                    <input type="text" id="cpf" value={cpf} onChange={handleCpfChange} required placeholder="INSIRA SEU CPF" />
                </div>
                 <div className="form-group">
                    <label htmlFor="serviceLink">Link do Serviço</label>
                    <input type="url" id="serviceLink" value={serviceLink} onChange={e => setServiceLink(e.target.value)} required placeholder="https://servico.infoco.com.br" />
                </div>
                
                <div className="email-preview">
                    <h4>Pré-visualização do Email</h4>
                    <pre>{emailBodyPreview}</pre>
                </div>

                <button type="submit" className="upload-btn" disabled={isSending}>
                    {isSending ? 'Enviando...' : 'Enviar Email'}
                </button>
            </form>
        </div>
    );
};


// Dashboard Analytics Component
const DashboardAnalytics: React.FC<{ stats: DashboardStats | null, isLoading: boolean }> = ({ stats, isLoading }) => {
    if (isLoading || !stats) {
        return <div className="stats-grid"><div className="stat-card">Carregando estatísticas...</div></div>
    }

    const chartData = {
      labels: stats.contractsByUser.map(item => item.user),
      datasets: [
        {
          label: 'Contratos Enviados',
          data: stats.contractsByUser.map(item => item.count),
          backgroundColor: '#3b82f6',
          borderColor: '#1e40af',
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Top 5 Usuários por Uploads',
          font: { size: 16 }
        },
      },
      scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 1
            }
        }
      }
    };

    return (
        <>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-card-icon">
                        <FileTextIcon />
                    </div>
                    <div className="stat-card-info">
                        <span className="stat-card-title">Total de Contratos</span>
                        <span className="stat-card-value">{stats.totalContracts}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon">
                        <UsersIcon />
                    </div>
                    <div className="stat-card-info">
                        <span className="stat-card-title">Usuários Ativos</span>
                        <span className="stat-card-value">{stats.activeUsers}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card-icon">
                        <DatabaseIcon />
                    </div>
                    <div className="stat-card-info">
                        <span className="stat-card-title">Espaço Utilizado</span>
                        <span className="stat-card-value">{formatBytes(stats.totalSize)} / 20 GB</span>
                    </div>
                </div>
            </div>
            <div className="chart-container">
                <Bar options={chartOptions} data={chartData} />
            </div>
        </>
    )
};

// Contract Detail Component
const ContractDetail: React.FC<{ contract: Contract; onBack: () => void, onEdit: (contract: Contract) => void, onDelete: (contract: Contract) => void }> = ({ contract, onBack, onEdit, onDelete }) => {
    return (
        <div className="contract-detail-container">
            <header className="detail-header">
                <button className="back-btn" onClick={onBack}><ChevronLeftIcon /> Voltar</button>
                <div className="detail-actions">
                     <button className="action-btn edit-btn" onClick={() => onEdit(contract)}>
                        <PencilIcon /> Editar
                     </button>
                     <button className="action-btn delete-btn" onClick={() => onDelete(contract)}>
                        <TrashIcon /> Excluir
                     </button>
                     <a 
                        href={contract.file_url} 
                        className="action-btn download-btn" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        download={contract.filename}
                    >
                        <DownloadIcon />
                        Download
                    </a>
                </div>
            </header>
            <div className="detail-grid">
                <div className="detail-card">
                    <h3><FileTextIcon /> Detalhes do Arquivo</h3>
                    <ul className="metadata-list">
                        <li><strong>Nome do Arquivo:</strong> <span>{contract.filename}</span></li>
                        <li><strong>Enviado por:</strong> <span>{contract.uploaded_by}</span></li>
                        <li><strong>Data de Upload:</strong> <span>{new Date(contract.upload_date).toLocaleDateString('pt-BR')}</span></li>
                        <li><strong>Tamanho:</strong> <span>{formatBytes(contract.file_size)}</span></li>
                    </ul>
                </div>
                <div className="detail-card">
                    <h3><FileTextIcon /> Metadados Extraídos</h3>
                     <ul className="metadata-list">
                        {Object.entries(contract.metadata).length > 0 ? Object.entries(contract.metadata).map(([key, value]) => (
                            <li key={key}><strong>{key}:</strong> <span>{value}</span></li>
                        )) : (
                            <p className="no-data-message-small">Nenhum metadado extraído.</p>
                        )}
                    </ul>
                </div>
                 <div className="detail-card full-width">
                    <h3><ClockIcon /> Log de Atividades</h3>
                    {contract.activity_log.length > 0 ? (
                        <div className="table-container">
                             <table className="contracts-table">
                                <thead>
                                    <tr>
                                        <th>Usuário</th>
                                        <th>Ação</th>
                                        <th>Data e Hora</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contract.activity_log.map((log, index) => (
                                        <tr key={index}>
                                            <td>{log.user}</td>
                                            <td>{log.action}</td>
                                            <td>{new Date(log.timestamp).toLocaleString('pt-BR')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="no-data-message">Nenhuma atividade registrada para este arquivo.</p>
                    )}
                </div>
            </div>
        </div>
    );
};


// Contract Management Component
const ContractManagement: React.FC<{
    contracts: Contract[], 
    onSelectContract: (contract: Contract) => void,
    onEdit: (contract: Contract) => void,
    onDelete: (contract: Contract) => void,
    isLoading: boolean,
    error: string | null
}> = ({ contracts, onSelectContract, onEdit, onDelete, isLoading, error }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContracts = contracts.filter(contract =>
        contract.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="contract-management-container">
            <header className="contract-header">
                <div className="search-bar">
                    <SearchIcon />
                    <input
                        type="search"
                        placeholder="Buscar por nome do arquivo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>
            <div className="table-container">
                <table className="contracts-table">
                    <thead>
                        <tr>
                            <th>Nome do Arquivo</th>
                            <th>Enviado por</th>
                            <th>Data de Upload</th>
                            <th>Tamanho</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr><td colSpan={5} className="table-message">Carregando...</td></tr>
                        )}
                        {error && (
                            <tr><td colSpan={5} className="table-message error">{error}</td></tr>
                        )}
                        {!isLoading && !error && filteredContracts.length > 0 ? filteredContracts.map(contract => (
                            <tr key={contract.id} onClick={() => onSelectContract(contract)} role="button" tabIndex={0}>
                                <td>{contract.filename}</td>
                                <td>{contract.uploaded_by}</td>
                                <td>{new Date(contract.upload_date).toLocaleDateString('pt-BR')}</td>
                                <td>{formatBytes(contract.file_size)}</td>
                                <td>
                                    <div className="actions-cell">
                                        <button className="action-btn icon-btn edit-btn" title="Editar" onClick={(e) => {e.stopPropagation(); onEdit(contract);}}><PencilIcon/></button>
                                        <button className="action-btn icon-btn delete-btn" title="Excluir" onClick={(e) => {e.stopPropagation(); onDelete(contract);}}><TrashIcon/></button>
                                        <a 
                                          href={contract.file_url} 
                                          className="action-btn icon-btn download-btn" 
                                          title="Download"
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          download={contract.filename}
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                            <DownloadIcon />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                           !isLoading && !error && (
                                <tr>
                                    <td colSpan={5} className="table-message">
                                        Nenhum contrato encontrado.
                                    </td>
                                </tr>
                           )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// Dashboard Component
const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState('dashboard');
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isStatsLoading, setIsStatsLoading] = useState(true);

    const [modalState, setModalState] = useState<{ type: 'edit' | 'delete' | null, contract: Contract | null }>({ type: null, contract: null });
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);


    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const fetchContracts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/contracts');
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Falha ao buscar contratos.');
            }
            const data = await response.json();
            setContracts(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        setIsStatsLoading(true);
        try {
            const response = await fetch('/api/stats');
             if (!response.ok) throw new Error('Falha ao buscar estatísticas.');
            const data = await response.json();
            setStats(data);
        } catch (err) {
            console.error(err);
        } finally {
             setIsStatsLoading(false);
        }
    }, []);


    useEffect(() => {
        fetchContracts();
        fetchStats();
    }, [fetchContracts, fetchStats]);


    const handleViewChange = (view: string) => {
        setActiveView(view);
        setSelectedContract(null);
    }

    const handleUploadComplete = () => {
        fetchContracts();
        fetchStats();
        setActiveView('contracts');
        setToast({ message: 'Upload concluído com sucesso!', type: 'success' });
    };

    const handleOpenModal = (type: 'edit' | 'delete', contract: Contract) => {
        setModalState({ type, contract });
    };

    const handleCloseModal = () => {
        setModalState({ type: null, contract: null });
    };

    const handleConfirmDelete = async () => {
        if (!modalState.contract) return;
        try {
            const { id } = modalState.contract;
            const response = await fetch(`/api/delete-contract?id=${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                let errorMessage = `Falha ao excluir o contrato. Status: ${response.status}`;
                if (response.headers.get('content-type')?.includes('application/json')) {
                    try {
                        const errorBody = await response.json();
                        errorMessage = errorBody.error || errorBody.details || errorMessage;
                    } catch (e) {
                        console.error("Could not parse error response as JSON", e);
                    }
                }
                throw new Error(errorMessage);
            }

            setToast({ message: 'Contrato excluído com sucesso!', type: 'success' });
            fetchContracts();
            fetchStats();
            if (selectedContract?.id === id) {
                setSelectedContract(null);
            }
        } catch (err) {
             setToast({ message: (err as Error).message, type: 'error' });
        } finally {
            handleCloseModal();
        }
    };
    
    const handleUpdateContract = async (updatedContract: Contract) => {
        try {
            const response = await fetch(`/api/update-contract?id=${updatedContract.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: updatedContract.filename,
                    metadata: updatedContract.metadata,
                }),
            });
             if (!response.ok) {
                let errorMessage = `Falha ao atualizar o contrato. Status: ${response.status}`;
                try {
                    const errorBody = await response.json();
                    errorMessage = errorBody.error || errorBody.details || errorMessage;
                } catch (e) {
                    console.error("Could not parse error response as JSON", e);
                }
                throw new Error(errorMessage);
            }
            setToast({ message: 'Contrato atualizado com sucesso!', type: 'success' });
            fetchContracts();
            if (selectedContract?.id === updatedContract.id) {
                setSelectedContract(updatedContract);
            }
        } catch (err) {
             setToast({ message: (err as Error).message, type: 'error' });
        } finally {
            handleCloseModal();
        }
    };


    const renderContent = () => {
        switch (activeView) {
            case 'dashboard':
                return <><h2>Dashboard</h2><DashboardAnalytics stats={stats} isLoading={isStatsLoading} /></>;
            case 'upload':
                return <><h2>Upload de Contratos</h2><Uploader onUploadComplete={handleUploadComplete} /></>;
            case 'email':
                return <><h2>Enviar Credenciais por Email</h2><EmailSender setToast={setToast} /></>;
            case 'institucional':
                return <><h2>Institucional</h2><BannerAnimado /></>;
            case 'contracts':
                if (selectedContract) {
                    return <ContractDetail contract={selectedContract} onBack={() => setSelectedContract(null)} onEdit={handleOpenModal.bind(null, 'edit')} onDelete={handleOpenModal.bind(null, 'delete')} />;
                }
                return <><h2>Gerenciar Contratos</h2><ContractManagement contracts={contracts} onSelectContract={setSelectedContract} onEdit={handleOpenModal.bind(null, 'edit')} onDelete={handleOpenModal.bind(null, 'delete')} isLoading={isLoading} error={error} /></>;
            default:
                return <><h2>Dashboard</h2><DashboardAnalytics stats={stats} isLoading={isStatsLoading} /></>;
        }
    };
    
    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                 <img src="/assets/logo.png" alt="INFOCO Logo" className="sidebar-logo" />
                <nav className="sidebar-nav">
                    <button className={activeView === 'dashboard' && !selectedContract ? 'active' : ''} onClick={() => handleViewChange('dashboard')}>Dashboard</button>
                    <button className={activeView === 'upload' ? 'active' : ''} onClick={() => handleViewChange('upload')}>Upload</button>
                    <button className={activeView === 'contracts' && !selectedContract ? 'active' : ''} onClick={() => handleViewChange('contracts')}>Contratos</button>
                    <button className={activeView === 'email' ? 'active' : ''} onClick={() => handleViewChange('email')}>Enviar Email</button>
                    <button className={activeView === 'institucional' ? 'active' : ''} onClick={() => handleViewChange('institucional')}>Institucional</button>
                </nav>
            </aside>
            <main className="main-content">
                <header className="dashboard-header">
                    <h1>Portal de Contratos</h1>
                    <button className="logout-btn" onClick={onLogout}>Sair</button>
                </header>
                <div className="content-area">
                    {renderContent()}
                </div>
            </main>
            {/* Modals */}
            <Modal isOpen={modalState.type === 'delete'} onClose={handleCloseModal} title="Confirmar Exclusão">
                <p>Você tem certeza que deseja excluir o arquivo "{modalState.contract?.filename}"?</p>
                <p>Esta ação não pode ser desfeita.</p>
                <div className="modal-actions">
                    <button className="modal-btn cancel-btn" onClick={handleCloseModal}>Cancelar</button>
                    <button className="modal-btn confirm-btn delete" onClick={handleConfirmDelete}>Excluir</button>
                </div>
            </Modal>
             <Modal isOpen={modalState.type === 'edit'} onClose={handleCloseModal} title="Editar Contrato">
                <EditContractForm contract={modalState.contract} onSave={handleUpdateContract} onCancel={handleCloseModal} />
            </Modal>
            <Toast message={toast?.message ?? null} type={toast?.type ?? 'success'} />
        </div>
    );
};

// Edit Contract Form Component
const EditContractForm: React.FC<{contract: Contract | null, onSave: (contract: Contract) => void, onCancel: () => void}> = ({ contract, onSave, onCancel }) => {
    const [filename, setFilename] = useState(contract?.filename || '');
    const [metadata, setMetadata] = useState(JSON.stringify(contract?.metadata || {}, null, 2));

    if (!contract) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const parsedMetadata = JSON.parse(metadata);
            onSave({ ...contract, filename, metadata: parsedMetadata });
        } catch (error) {
            alert('Metadados em formato JSON inválido.');
        }
    };
    
    return (
        <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
                <label htmlFor="filename">Nome do Arquivo</label>
                <input id="filename" type="text" value={filename} onChange={e => setFilename(e.target.value)} required />
            </div>
             <div className="form-group">
                <label htmlFor="metadata">Metadados (JSON)</label>
                <textarea id="metadata" value={metadata} onChange={e => setMetadata(e.target.value)} rows={8} required />
            </div>
            <div className="modal-actions">
                <button type="button" className="modal-btn cancel-btn" onClick={onCancel}>Cancelar</button>
                <button type="submit" className="modal-btn confirm-btn">Salvar Alterações</button>
            </div>
        </form>
    )
}


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
        <div className="app-container login-view">
            <LoginScreen onLogin={() => setIsAuthenticated(true)} />
        </div>
    );
  }

  return (
    <div className="app-container dashboard-view">
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
    </div>
  );
};

export default App;
