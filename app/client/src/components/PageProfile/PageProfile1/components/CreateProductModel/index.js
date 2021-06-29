/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import {
  Input,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Alert,
  Form
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import { createProduct } from '../../../../../Action/appAction';
import { UploadCloud, Check, X } from 'react-feather';

// eslint-disable-next-line unused-imports/no-unused-vars
const CreateProduct = ({
  modal,
  setModal,
  setblocking,
  toggleModal,
  value,
  setValue,
  createProduct
}) => {
  const [productImage, setproductImage] = useState([]);
  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png',
    onDrop: async (files) => {
      setproductImage(files);
    }
  });
  const {
    register,
    handleSubmit
    // formState: { errors }
  } = useForm();
  const files = acceptedFiles.map((file) => (
    <ListGroupItem
      className="font-size-sm px-3 py-2 text-primary d-flex justify-content-between align-items-center"
      key={file.path}>
      <span>{file.path}</span>{' '}
      <span className="badge badge-pill bg-neutral-warning text-warning">
        {file.size} bytes
      </span>
    </ListGroupItem>
  ));
  const onSubmit = async (data) => {
    console.log(value);
    console.log(data);
    let form = new FormData();
    productImage.map((file) => form.append('image', file));
    form.append('description', value);
    form.append('name', data.name);
    form.append('price', data.price);
    let obj = {
      description: value,
      name: data.name,
      price: data.price
    };
    setblocking(true);
    await createProduct(form, obj);
    setblocking(false);
    toggleModal();
  };
  return (
    <div>
      <Modal
        size="lg"
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={toggleModal}
        contentClassName="border-0 bg-white">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-4 text-center">
            <h4 className="font-size-xxl font-weight-bold mb-2">
              Create New Product
            </h4>
            <p className="text-black-50 mb-0">
              Fill in the form fields below to create your product listing.
            </p>
          </div>
          <div className="divider bg-dark opacity-2" />
          <div className="p-4">
            <div className="font-weight-bold font-size-lg">Title</div>

            <p className="font-size-sm text-black-50">
              Write the title of your new product
            </p>

            <Input
              placeholder="Product title..."
              {...register('name', {
                required: 'You must specify a Name of product',
                maxLength: 80
              })}
              type="text"
              bsSize="lg"
            />
          </div>
          <div className="divider bg-dark opacity-3" />
          <div className="p-4">
            <div className="font-weight-bold font-size-lg">Images</div>

            <p className="font-size-sm text-black-50">
              Use the widget below to upload images for your product
            </p>

            <div className="dropzone">
              <div {...getRootProps({ className: 'dropzone-upload-wrapper' })}>
                <input {...getInputProps()} />
                <div className="dropzone-inner-wrapper">
                  {isDragAccept && (
                    <div>
                      <div className="d-100 btn-icon mb-3 hover-scale-lg bg-success shadow-success-sm rounded-circle text-white">
                        <Check className="d-50" />
                      </div>
                      <div className="font-size-sm text-success">
                        All files will be uploaded!
                      </div>
                    </div>
                  )}
                  {isDragReject && (
                    <div>
                      <div className="d-100 btn-icon mb-3 hover-scale-lg bg-danger shadow-danger-sm rounded-circle text-white">
                        <X className="d-50" />
                      </div>
                      <div className="font-size-sm text-danger">
                        Some files will be rejected!
                      </div>
                    </div>
                  )}
                  {!isDragActive && (
                    <div>
                      <div className="d-100 btn-icon mb-3 hover-scale-lg bg-white shadow-light-sm rounded-circle text-primary">
                        <UploadCloud className="d-50" />
                      </div>
                      <div className="font-size-sm">
                        Drag and drop files here{' '}
                        <span className="font-size-xs text-dark">
                          (jpg/png images)
                        </span>
                      </div>
                    </div>
                  )}

                  <small className="py-2 text-black-50">or</small>
                  <div>
                    <Button
                      color="primary"
                      className="hover-scale-sm font-weight-bold btn-pill px-4">
                      <span className="px-2">Browse Files</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="font-weight-bold my-4 text-uppercase text-dark font-size-sm text-center">
                Uploaded Files
              </div>
              {files.length <= 0 && (
                <div className="text-info text-center font-size-sm">
                  Uploaded demo files will appear here!
                </div>
              )}
              {files.length > 0 && (
                <div>
                  <Alert color="success" className="text-center mb-3">
                    You have uploaded <b>{files.length}</b> files!
                  </Alert>
                  <ListGroup className="font-size-sm">{files}</ListGroup>
                </div>
              )}
            </div>
          </div>
          <div className="divider bg-dark opacity-2" />
          <div className="p-4">
            <div className="font-weight-bold font-size-lg">Description</div>

            <p className="font-size-sm text-black-50">
              Write a short description for your new product
            </p>

            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              placeholder="Example placeholder..."
            />
          </div>
          <div className="divider bg-dark opacity-2" />
          <div className="p-4">
            <div className="font-weight-bold font-size-lg">Price</div>

            <p className="font-size-sm text-black-50">
              Write the Price of Product
            </p>
            <Input
              placeholder="Product price..."
              {...register('price', {
                required: 'You must specify a Price of Product',
                maxLength: 80
              })}
              type="number"
              bsSize="lg"
            />
          </div>
          <div className="divider bg-dark opacity-3" />
          <div className="p-4 rounded-bottom d-flex justify-content-end bg-secondary">
            <Button
              onClick={toggleModal}
              color="neutral-danger"
              className="font-size-sm mr-4">
              Cancel
            </Button>
            <Button color="success" type="submit" className="font-weight-bold">
              Save now
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { createProduct })(CreateProduct);
