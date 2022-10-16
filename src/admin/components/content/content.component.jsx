import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
  useRouteMatch,
  Switch,
  Route,
  useParams,
  Redirect
} from "react-router-dom";
import Showtime from "../../page/showtime/showtime.page";
import { featureList } from "../../helper/featureList";

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

const Content = (props) => {
  const { path } = useRouteMatch();
  const { feature } = useParams();
  const classes = useStyles();
  useEffect(() => {
    props.handleTitle(
      String(feature ? feature : "Dashboard").replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
      ) + " Management"
    );
  });

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Switch>
                {featureList.map((feature, i) => {
                  return (
                    <Route key={i} path={feature.url}>
                      {feature.component}
                    </Route>
                  );
                })}
                <Route path={`${path}/:maPhim`} component={Showtime} />
                <Route exact path="/admin">
                  Dashboard
                </Route>
                <Route path="">
                  <Redirect to="/admin" />
                </Route>
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
};
export default Content;
