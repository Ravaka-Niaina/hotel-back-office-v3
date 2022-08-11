import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      {/* <Typography gutterBottom align="center" variant="subtitle1">
        Pas de résultats
      </Typography>
      <Typography variant="body2" align="center">
        Pas de résultats trouvés pour &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Essayez de vérifier les typos ou utilisez des mots complets.
      </Typography> */}
    </Paper>
  );
}
