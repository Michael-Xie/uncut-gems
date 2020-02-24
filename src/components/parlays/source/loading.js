import React from "react"
import styled from "styled-components"
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

// const Article = styled.div` 
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #fff;
//   max-width: 600px;
//   width: 100%;
//   height: 50px;
//   border: 1px solid #dbdbdb;

//   margin: 0 auto;
// `
// const Load = styled.img`
//  max-height: 20px;
//  max-width: 20px;
//  height: 50%;
// `
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Loading() {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 1000) {
          return 0;
        }
        const diff = Math.random() * 10000;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    // <Article>
    //   <Load src="http://cdn.lowgif.com/full/d9675675623d5f27-loading-gif-transparent-background-loading-gif.gif" alt="loading"/>
    // </Article>
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={completed} color="secondary" />
    </div>
  );
}
