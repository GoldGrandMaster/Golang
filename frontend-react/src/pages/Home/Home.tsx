import * as React from 'react';
import Modal from 'react-modal';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

import Footer from '../../components/Footer.tsx';

import AppService from '../../services/appService.ts';
import { IAppColumn, IAppData } from '../../interface/interface.ts';

import './Home.css';
import BackgroundImage from '../../assets/123.png';
import { useNavigate } from 'react-router-dom';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '630px',
    height: '300px',
    borderRadius: '7px',
    padding: 0,
  },
};

const columns: readonly IAppColumn[] = [
  { id: 'owner', label: 'OWNER', minWidth: 170, align: 'center' },
  { id: 'app_number', label: 'APP NUMBER', minWidth: 100, align: 'center' },
  {
    id: 'created_at',
    label: 'DATE CREATED',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'statements',
    label: 'STATEMENTS',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toFixed(2),
  },
  {
    id: 'app_status',
    label: 'APP STATUS',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value == 0 ? 'Convert Statement' : 'ScoreCard',
  }
];

function Home() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [appName, setAppName] = React.useState('');
  const [appArray, setAppArray] = React.useState<IAppData[]>([]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  const navigate = useNavigate();

  /* ----- Modal Functions ----- */
  const openModal = () => {
    setIsOpen(true);
  }

  // const afterOpenModal = () => {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  const closeModal = () => {
    setIsOpen(false);
  }

  /* ----- Pagenation Functions ----- */
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /* ----- Functionalities ----- */
  const handleNewApplication = () => {
    AppService.createApp(appName)
      .then(res => {
        console.log(res.data.application);
        navigate('/home/pdfextract');
      })
      .catch(err => {
        console.error('Error creating application', err);
      });
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    AppService.getAppList()
      .then(res => {
        console.log('get app list', res.data.applications);
        setAppArray(res.data.applications);
      })
      .catch(err => {
        console.error('Error getting app list', err);
      });
  }, []);

  return (
    <>
      <div style={{ backgroundImage: `url(${BackgroundImage})`, height: '90vh', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
        <Button variant="contained" color="success" onClick={openModal}>
          NEW APPLICATION
        </Button>

      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden', paddingX: '5%' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, zIndex: 0 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {appArray
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {/* {columns.map((column) => {
                        const value = row[column.id as keyof IAppData];
                        if (column.id as keyof IAppData === "app_status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button variant="contained">
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </Button>
                            </TableCell>
                          )
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })} */}
                      <TableCell 
                        className='hover:cursor-pointer !text-purple-800'
                        onClick={() => navigate(`/home/pdfextract/${row.id}`)}
                      >
                        {row.owner}
                      </TableCell>
                      <TableCell
                        className='hover:cursor-pointer !text-purple-800'
                        onClick={() => navigate(`/home/pdfextract/${row.id}`)}
                      >
                        {row.app_number}
                      </TableCell>
                      <TableCell>{row.created_at}</TableCell>
                      <TableCell>{row.statements} reconcile</TableCell>

                      <TableCell align="center">
                        {row.app_status === 0 ?
                          <Button variant="outlined" color="secondary">
                            Convert Statement
                          </Button> :
                          <Button variant="contained" color="success">
                            Convert Statement
                          </Button>}
                      </TableCell>

                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={appArray.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper >
      <Footer />
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        ariaHideApp={false}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="container">
            <div className="title">
              NEW APPLICATION
            </div>
            <button onClick={closeModal} className="close-button">
              X
            </button>
          </div>
          <div className="form-container">
            <div className="label">
              APP NUMBER
            </div>
            <input
              className="input-box"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />
            <div className="description">First, let's start with the app number.</div>
            <div className="button-container">
              <button
                className="btn-new-application"
                onClick={closeModal}
              >
                CANCEL
              </button>
              <button
                className="btn-new-application btn-new-application-start"
                onClick={handleNewApplication}
              >
                START
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Home;
