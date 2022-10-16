import React from "react";
import {
  Grid,
  makeStyles,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Table
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttonOutlineNone: {
    "&:focus": {
      outline: "none"
    }
  },
  tableCellHead: {
    fontWeight: "600"
  },
  tableCellBody: {
    padding: `0 ${theme.spacing(2)}px`
  }
}));

const DataTable = ({
  dataFieldList,
  dataListPagination,
  handleDelete,
  handleEdit,
  deleteObjectKey,
  isMovie
}) => {
  const classes = useStyles();

  return (
    <>
      <Grid>
        <TableContainer>
          <Table style={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell
                  classes={{
                    head: classes.tableCellHead
                  }}
                  style={{ width: "60px" }}
                >
                  STT
                </TableCell>
                {dataFieldList.map((dataField, i) => {
                  return (
                    <TableCell
                      style={{ width: dataField.width }}
                      key={i}
                      className={classes.tableCellHead}
                    >
                      {dataField.name_VN}
                    </TableCell>
                  );
                })}
                <TableCell
                  classes={{
                    head: classes.tableCellHead
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataListPagination.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className={classes.tableCellBody}>
                      {index + 1}
                    </TableCell>
                    {dataFieldList.map((dataField, i) => {
                      return (
                        <TableCell
                          key={i}
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            maxWidth: dataField.width
                          }}
                          className={classes.tableCellBody}
                        >
                          {data[`${dataField.key}`]}
                        </TableCell>
                      );
                    })}
                    {isMovie ? (
                      <TableCell className={classes.tableCellBody}>
                        <NavLink
                          to={`/admin/showtime/${data[`${deleteObjectKey}`]}`}
                        >
                          <Button
                            className={classes.buttonOutlineNone}
                            size="small"
                            variant="outlined"
                            color="primary"
                          >
                            Lịch chiếu
                          </Button>
                        </NavLink>
                      </TableCell>
                    ) : (
                      ""
                    )}
                    <TableCell className={classes.tableCellBody}>
                      <IconButton
                        title="Sửa"
                        color="primary"
                        className={classes.buttonOutlineNone}
                        onClick={() => handleEdit(data)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        title="Xóa"
                        color="secondary"
                        className={classes.buttonOutlineNone}
                        onClick={() => handleDelete(data[`${deleteObjectKey}`])}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
};

export default DataTable;
