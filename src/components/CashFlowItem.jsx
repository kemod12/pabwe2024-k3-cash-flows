import PropTypes from "prop-types";
import { FaClock, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2"; // Ensure you have SweetAlert2 installed
import { postedAt } from "../utils/tools";

function CashFlowItem({ cashFlow, onDeleteCashFlow }) {
  let badgeStatus, badgeLabel;

  if (cashFlow.type === "inflow") {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Inflow";
  } else if (cashFlow.type === "outflow") {
    badgeStatus = "badge bg-danger text-white ms-3";
    badgeLabel = "Outflow";
  }

  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Cash Flow",
      text: `Apakah kamu yakin ingin menghapus cash flow: ${cashFlow.label}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Tetap Hapus",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        if (cashFlow.id && Number.isInteger(cashFlow.id)) {
          onDeleteCashFlow(cashFlow.id);
        } else {
          console.error("Invalid ID:", cashFlow.id);
        }
      }
    });
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-8">
            <h5>{cashFlow.label}</h5>
            <span className={badgeStatus}>{badgeLabel}</span>
            <p>{cashFlow.description}</p>
            <p>Nominal: {cashFlow.nominal}</p>
          </div>
          <div className="col-4 text-end">
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-sm btn-outline-danger"
            >
              <FaTrash /> Hapus
            </button>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(cashFlow.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CashFlowItem.propTypes = {
  cashFlow: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    nominal: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteCashFlow: PropTypes.func.isRequired,
};

export default CashFlowItem;
