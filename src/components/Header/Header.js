import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, Toolbar, MenuItem, Menu, makeStyles, Link, Avatar } from '@material-ui/core';
import { AccountCircle, HomeTwoTone } from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';
import { clearAuth } from 'store/auth/auth-actions';

const useStyles = makeStyles(theme => ({
  toolbar: {
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    '&:hover': { color: 'white' },
  },
}));

const Header = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isOpen = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSignOut = () => {
    dispatch(clearAuth());
    window.location.reload();
  };

  return (
    <Grid item sm={12} xl={12} xs={12}>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <div>
            <IconButton component={RouterLink} to={'/posts'} className={styles.title}>
              <HomeTwoTone />
            </IconButton>
            <IconButton
              size="small"
              component={RouterLink}
              to={'/posts/users/all'}
              className={styles.title}
            >
              All Posts
            </IconButton>
          </div>
          {currentUser ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {currentUser.avatar ? (
                  <Avatar
                    alt={currentUser.username}
                    srcSet={
                      currentUser.avatar.startsWith('http')
                        ? currentUser.avatar
                        : `http://localhost:8000${currentUser.avatar}`
                    }
                    src={
                      currentUser.avatar.startsWith('http')
                        ? currentUser.avatar
                        : `http://localhost:8000${currentUser.avatar}`
                    }
                  />
                ) : (
                  <AccountCircle />
                )}
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
                <MenuItem component={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link component={RouterLink} to="/sign-in" color="inherit">
              Sign In
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Grid>
  );
};

export default Header;
