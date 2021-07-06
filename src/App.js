import React, {useState} from 'react';

import { blogs } from './blogs';


import { users } from './users';


import './App.css';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import {
  CssBaseline, 
  Typography, 
  AppBar, 
  Toolbar, 
  Button, 
  Box,
  Container,
  Card,
  CardContent, 
  CardActionArea,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
   
    background: '#dfe0de',
    paddingBottom: theme.spacing(5)
  },
  card:{
    maxWidth: '100%',
    marginBottom: theme.spacing(4)
  },
  cardMedia:{
    height: '140px'
  }
}))

const LoginDialog = (props) => {
  const classes = useStyles();
  const { onClose, open, toggleLogin, users, handleLogin } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidCreds, setinvalidCreds] = useState(false);

  const handleClose = () => {
    onClose();

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(!email || !password) alert("Email and Password cannot be empty!");
    let temp = users.filter(user => user.email === email && user.password === password)
    if(temp.length !== 1) setinvalidCreds(true);
    else {
      toggleLogin();
      handleLogin({email, password});
    }
    handleClose()
    console.log(email, password);
    
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="login-dialog-title" open={open}>

      <DialogTitle id="login-dialog-title" color="default">Login</DialogTitle>

      <form onSubmit={handleFormSubmit}>
        <DialogContent>
          
            <Box paddingBottom={2}>
                <TextField 
                id='email' 
                label='Email' 
                variant='outlined'
                color='primary'
                type='email'
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                required={true}
                />
            </Box>

            <Box paddingBottom={2}>
                <TextField 
                id='password' 
                label='Password' 
                variant='outlined'
                color='default'
                type='password'
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                required={true}
                />
            </Box>
            {
              invalidCreds && (email.length>0 || password.length>0) &&
              <Typography variant='subtitle2' color='default'>Incorrent Email or Password!</Typography>
            }
        </DialogContent>
        <DialogActions>
          <Button color='secondary' variant="contained" type='submit'>Login</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const BlogDialog = (props) =>{
  const theme = useTheme();
  const {onClose, open, handleBlogAdd, addBlog} = props;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [img, setImg] = useState('');

  const handleClose = () => {
    onClose();
  };

  const handleFormSubmit = e => {
    e.preventDefault(); 
    addBlog({title, content, img})
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="blog-dialog-title" open={open} maxWidth='lg' fullWidth={true}>
      <DialogTitle id="blog-dialog-title">Blog</DialogTitle>
      <form onSubmit={handleFormSubmit} >
        <DialogContent>
          <Box paddingBottom={2}>
            <TextField 
            id='title' 
            label='Title' 
            variant='outlined'
            color='default'
            type='text'
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
            required={true}
            />
          </Box>

          <Box paddingBottom={2}>
            <TextField 
            id='content' 
            label='Content' 
            variant='outlined'
            color='primary'
            type='text'
            fullWidth
            onChange={(e) => setContent(e.target.value)}
            multiline={true}
            rows={10}
            required={true}
            />
          </Box>
         <div>
          <input type="file" />
          </div>
          
         

        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='secondary' style={{textTransform: 'none'}} type='submit'>Publish your Blog</Button>
        </DialogActions>
      </form>
    </Dialog>
  )

}

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [loginDialog, setloginDialog] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [loggedInUser, setloggedInUser] = useState({});
  const [blogDialog, setblogDialog] = useState(false)

  const addBlog = ({title, content, img}) => {
    if(title.length > 0 && content.length > 0 && img.length > 0) blogs.push({title, content, img})
  };

  const toggleLogin = () => {
    setloggedIn(!loggedIn);
  };

  const handleLogin = (user) => {
    setloggedInUser(user);
  };

  const handleLogout = () => {
    setloggedIn(!loggedIn);
    setloggedInUser({});
  }

  const handleLoginDialogOpen = () => {
    setloginDialog(true);
  };

  const handleLoginDialogClose = () => {
    setloginDialog(false);
  };

  const handleBlogDialogOpen = () => {
    setblogDialog(true);
  };

  const handleBlogDialogClose = () => {
    setblogDialog(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <AppBar position="static">
        <Toolbar>
          <Box style={{background: 'none',   flexGrow:1 }}>
            <Typography variant="h6" className={classes.title}>

              Blog Portal 

            </Typography>
            
          </Box>
          {
            !loggedIn &&
            <Button variant='contained' color="default" onClick={handleLoginDialogOpen}>Login</Button>
          }
          {
            loggedIn &&
            <Button variant='contained' color="default" onClick={handleLogout}>Logout</Button>
          }
          
          {/* <Accordion>Login</Accordion> */}
        </Toolbar>
      </AppBar>

      <Container style={{paddingTop: theme.spacing(5),justifyContent: 'center'}}>
        {
          loggedIn &&
          <Box margin={2}>

          <Button variant="contained" color='secondary' style={{textTransform: 'none' }} onClick={handleBlogDialogOpen}>Add Your Own Blog</Button>

          </Box>
        }
        {
          blogs.map((item, idx)=>
          <Card className={classes.card} key={idx}>
            <CardActionArea>
              <CardMedia
                className={classes.cardMedia}
                image={item.img}
                title={item.title}
              />
              </CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.title}
                </Typography>
                {/* <Typography variant="body2" color="textprimary" component="p"> */}
                  {item.content}
                {/* </Typography> */}
              </CardContent>
          </Card>
          )
        }
      

      </Container>

      <LoginDialog open={loginDialog} onClose={handleLoginDialogClose} toggleLogin={toggleLogin} users={users} handleLogin={handleLogin}/>
      <BlogDialog open={blogDialog} onClose={handleBlogDialogClose} addBlog={addBlog}/>
    </div>
  )
}

export default App;
