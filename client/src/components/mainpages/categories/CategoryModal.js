import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { GlobalState } from "../../../GlobalState";
import Button from "react-bootstrap/Button";
import axios from "axios";

function CategoryModal() {
  const state = useContext(GlobalState);
  const [categoryDialog, setCategoryDialog] =
    state.CategoriesAPI.categoryDialog;
  const [token] = state.token;
  const [callback, setCallback] = state.CategoriesAPI.callback;
  const [categories] = state.CategoriesAPI.categories;
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (categoryDialog.categoryId) {
      categories.forEach((item) => {
        if (categoryDialog.categoryId === item._id) {
          setCategory(item.name);
        }
      });
    }
  }, [categoryDialog, categories]);

  const closeDialog = () => {
    setCategoryDialog({
      action: "",
      isShow: false,
      categoryId: null,
    });
  };
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/api/category/${categoryDialog.categoryId}`,
        { name: category },
        { headers: { Authorization: token } }
      );

      closeDialog();
      setCallback(!callback);
      alert(res.data.msg);
    } catch (err) {
      alert(err.message.data.msg);
    }
  };
  const deleteCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `/api/category/${categoryDialog.categoryId}`,
        {
          headers: { Authorization: token },
        }
      );

      closeDialog();
      setCallback(!callback);
      alert(res.data.msg);
    } catch (err) {
      alert(err.message.data.msg);
    }
  };

  return (
    <Modal
      show={categoryDialog.isShow}
      onHide={() => {
        setCategoryDialog({ isShow: false, action: categoryDialog.action });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {categoryDialog.action === "create"
            ? "Create Category"
            : categoryDialog.action === "edit"
            ? "Edit Category"
            : categoryDialog.action === "delete"
            ? "Delete Category"
            : ""}
        </Modal.Title>
      </Modal.Header>
      {categoryDialog.action !== "delete" ? (
        <form onSubmit={updateCategory}>
          <Modal.Body>
            <input
              type="text"
              name="category"
              value={category}
              style={{ width: "100%" }}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      ) : (
        <>
          <Modal.Body>
            Are you sure to delete "{category}" category ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={deleteCategory}>
              Delete
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
}

export default CategoryModal;
