import React from "react";
import {
  Grid,
  makeStyles,
  InputBase,
  Button,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  buttonOutlineNone: {
    "&:focus": {
      outline: "none"
    }
  },
  searchIcon: {
    paddingRight: "10px",
    display: "flex",
    alignItems: "center"
  },

  titleHidden: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  },
  startIconButton: {
    [theme.breakpoints.down("xs")]: {
      margin: "0"
    }
  },
  input: {
    width: "20%"
  },
  topToolbar: {
    marginBottom: theme.spacing(2)
  }
}));

const TableTopToolbar = ({ handleOpenModal, handleSearch }) => {
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.topToolbar} justify="space-between" container>
        <Grid xs={7} sm={8} md={10} item>
          <Grid container>
            <Grid className={classes.searchIcon} item>
              <SearchIcon />
            </Grid>
            <Grid xs={8} sm={10} md={11} item>
              <InputBase
                className={classes.input}
                placeholder="Search by name"
                onChange={handleSearch}
                type="search"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            className={classes.buttonOutlineNone}
            classes={{
              startIcon: classes.startIconButton
            }}
            startIcon={<AddIcon />}
            color="primary"
            variant="contained"
            onClick={handleOpenModal}
          >
            <Typography variant="button" className={classes.titleHidden}>
              Add new
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default TableTopToolbar;
