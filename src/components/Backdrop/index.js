import { connect } from 'react-redux';
import Backdrop from './Backdrop';
import { closeModal } from '../../redux/backdrop/backdropActions';

const mapStateToProps = ({ isModalOpen }) => ({
  isModalOpen,
});

const mapDispatchToProps = {
  closeModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);
