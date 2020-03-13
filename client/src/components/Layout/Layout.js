import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, Link as RouterLink } from 'react-router-dom';
import {
  IconButton,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
  makeStyles,
  Link,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { clearAuth } from '../../store/auth/authActions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  title: {
    color: 'white',
    flexGrow: 1,
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

  let location = useLocation();
  let history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

  // useEffect(() => {
  //   const currentPath = location.pathname;
  // }, [location]);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    dispatch(clearAuth());
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item sm={12} xl={12} xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {location.pathname.split('/')}
              </Typography>
              {currentUser ? (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    getContentAnchorEl={null}
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={isOpen}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Link component={RouterLink} to="/signin" color="inherit">
                  Sign In
                </Link>
              )}
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container item justify="center" alignItems="center">
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Layout;
