import React from "react";
import {
  Grid,
  makeStyles,
  Select,
  Typography,
  MenuItem
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  dataPagination: {
    marginTop: theme.spacing(2)
  },
  selectNumberItem: {
    marginLeft: theme.spacing(2)
  },
  selectRoot: {
    padding: "6px 30px 6px 15px"
  },
  paginationRoot: {
    "& button": {
      "&:focus": {
        outline: "none"
      }
    }
  }
}));

const CommonPagination = ({
  hanldeChangePage,
  handleChangeItem,
  totalPages,
  currentPage
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid
        container
        justify="space-between"
        className={classes.dataPagination}
      >
        <Pagination
          onChange={hanldeChangePage}
          count={totalPages}
          variant="outlined"
          shape="rounded"
          boundaryCount={2}
          siblingCount={2}
          className={classes.paginationRoot}
          page={currentPage}
        />
        <Grid item>
          <Typography variant="caption">Số phần tử trên trang</Typography>
          <Select
            variant="outlined"
            defaultValue="5"
            classes={{ root: classes.selectRoot }}
            className={classes.selectNumberItem}
            onChange={handleChangeItem}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </>
  );
};

export default CommonPagination;
