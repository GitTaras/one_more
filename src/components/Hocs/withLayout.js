import { Container, Grid } from '@material-ui/core';
import React from 'react';
import Header from '../Header/Header';

// export default Component => props => (
//   <Container maxWidth={false} disableGutters>
//     <Grid container spacing={2}>
//       <Header />
//       <Grid container item justify="center" alignItems="center">
//         <Component {...props} />
//       </Grid>
//     </Grid>
//   </Container>
// );

export default Component => props => {
  //console.log('withlayuot pr', props);
  return (
    <Container maxWidth={false} disableGutters>
      <Grid container spacing={2}>
        <Header />
        <Grid container item justify="center" alignItems="center">
          <Component {...props} />
        </Grid>
      </Grid>
    </Container>
  );
};
