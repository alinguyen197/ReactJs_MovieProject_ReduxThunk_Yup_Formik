import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, Route } from "react-router-dom";
import Header from "../../components/header/header.component";
import Sidebar from "../../components/sidebar/sidebar.component";
import Content from "../../components/content/content.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  }
}));

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleTitle = (title) => {
    setTitle(title);
  };

  // let featureParam = props.match.params.feature;

  // let featureParam = useParams().feature;

  // const index = featureList.findIndex((feature) => feature.id === featureParam);

  // useEffect(() => {
  //   console.log(featureParam);
  //   if (index === -1) return;
  //   setTitle(featureList.find((feature) => feature.id === featureParam).title);
  // }, [featureParam]);

  // const renderFeature = () => {
  //   return index === -1 ? (
  //     <Redirect to="/admin" />
  //   ) : (
  //     featureList.find((feature) => feature.id === featureParam).component
  //   );
  // };

  const renderRouter = () => {
    return (
      <Switch>
        <Route exact path="/admin">
          <Content handleTitle={handleTitle}></Content>
        </Route>
        <Route path="/admin/:feature">
          <Content handleTitle={handleTitle}></Content>
        </Route>
      </Switch>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} title={title} open={open} />
      <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
      {/* <Content renderFeature={renderFeature} /> */}
      {renderRouter()}
    </div>
  );
}
export default Dashboard;
