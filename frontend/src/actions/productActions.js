import Axios from "axios";
import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
} from "../constants/productConstants";

export const listProducts =
  ({ keyword = "", seller = "", pageNumber = "" }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await Axios.get(
        `http://localhost:5000/api/products?seller=${seller}&keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const createProduct = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    console.log(userInfo);
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    const { data } = await Axios.post(
      "http://localhost:5000/api/products",
      {},
      {
        headers: {
          Authorization: `bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST });
      const { data } = await Axios.post(
        `http://localhost:5000/api/products/${productId}/reviews`,
        review,
        {
          headers: {
            Authorization: `bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_REVIEW_SAVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await Axios.delete(
      `http://localhost:5000/api/products/${productId}`,
      {
        headers: {
          Authorization: `bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await Axios.get(
      `http://localhost:5000/api/products/${productId}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `http://localhost:5000/api/products/${product._id}`,
      product,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
