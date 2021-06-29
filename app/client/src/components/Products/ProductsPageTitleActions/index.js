import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Input,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Alert
} from 'reactstrap';

import { useDropzone } from 'react-dropzone';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactQuill from 'react-quill';

import { UploadCloud, Check, X } from 'react-feather';

const ProductsPageTitleActions = () => {
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [value, setValue] = useState('');

  const options = [
    {
      name: 'Alabama',
      population: 4780127,
      capital: 'Montgomery',
      region: 'South'
    },
    { name: 'Alaska', population: 710249, capital: 'Juneau', region: 'West' },
    {
      name: 'Arizona',
      population: 6392307,
      capital: 'Phoenix',
      region: 'West'
    },
    {
      name: 'Arkansas',
      population: 2915958,
      capital: 'Little Rock',
      region: 'South'
    },
    {
      name: 'California',
      population: 37254503,
      capital: 'Sacramento',
      region: 'West'
    },
    {
      name: 'Colorado',
      population: 5029324,
      capital: 'Denver',
      region: 'West'
    },
    {
      name: 'Connecticut',
      population: 3574118,
      capital: 'Hartford',
      region: 'Northeast'
    },
    { name: 'Delaware', population: 897936, capital: 'Dover', region: 'South' },
    {
      name: 'Florida',
      population: 18804623,
      capital: 'Tallahassee',
      region: 'South'
    },
    {
      name: 'Georgia',
      population: 9688681,
      capital: 'Atlanta',
      region: 'South'
    },
    {
      name: 'Hawaii',
      population: 1360301,
      capital: 'Honolulu',
      region: 'West'
    },
    { name: 'Idaho', population: 1567652, capital: 'Boise', region: 'West' },
    {
      name: 'Illinois',
      population: 12831549,
      capital: 'Springfield',
      region: 'Midwest'
    },
    {
      name: 'Indiana',
      population: 6484229,
      capital: 'Indianapolis',
      region: 'Midwest'
    },
    {
      name: 'Iowa',
      population: 3046869,
      capital: 'Des Moines',
      region: 'Midwest'
    },
    {
      name: 'Kansas',
      population: 2853132,
      capital: 'Topeka',
      region: 'Midwest'
    },
    {
      name: 'Kentucky',
      population: 4339349,
      capital: 'Frankfort',
      region: 'South'
    },
    {
      name: 'Louisiana',
      population: 4533479,
      capital: 'Baton Rouge',
      region: 'South'
    },
    {
      name: 'Maine',
      population: 1328361,
      capital: 'Augusta',
      region: 'Northeast'
    },
    {
      name: 'Maryland',
      population: 5773785,
      capital: 'Annapolis',
      region: 'South'
    },
    {
      name: 'Massachusetts',
      population: 6547817,
      capital: 'Boston',
      region: 'Northeast'
    },
    {
      name: 'Michigan',
      population: 9884129,
      capital: 'Lansing',
      region: 'Midwest'
    },
    {
      name: 'Minnesota',
      population: 5303925,
      capital: 'Saint Paul',
      region: 'Midwest'
    },
    {
      name: 'Mississippi',
      population: 2968103,
      capital: 'Jackson',
      region: 'South'
    },
    {
      name: 'Missouri',
      population: 5988927,
      capital: 'Jefferson City',
      region: 'Midwest'
    },
    { name: 'Montana', population: 989417, capital: 'Alberta', region: 'West' },
    {
      name: 'Nebraska',
      population: 1826341,
      capital: 'Lincoln',
      region: 'Midwest'
    },
    {
      name: 'Nevada',
      population: 2700691,
      capital: 'Carson City',
      region: 'West'
    },
    {
      name: 'New Hampshire',
      population: 1316466,
      capital: 'Concord',
      region: 'Northeast'
    },
    {
      name: 'New Jersey',
      population: 8791936,
      capital: 'Trenton',
      region: 'Northeast'
    },
    {
      name: 'New Mexico',
      population: 2059192,
      capital: 'Santa Fe',
      region: 'West'
    },
    {
      name: 'New York',
      population: 19378087,
      capital: 'Albany',
      region: 'Northeast'
    },
    {
      name: 'North Carolina',
      population: 9535692,
      capital: 'Raleigh',
      region: 'South'
    },
    {
      name: 'North Dakota',
      population: 672591,
      capital: 'Bismarck',
      region: 'Midwest'
    },
    {
      name: 'Ohio',
      population: 11536725,
      capital: 'Columbus',
      region: 'Midwest'
    },
    {
      name: 'Oklahoma',
      population: 3751616,
      capital: 'Oklahoma City',
      region: 'South'
    },
    { name: 'Oregon', population: 3831073, capital: 'Salem', region: 'West' },
    {
      name: 'Pennsylvania',
      population: 12702887,
      capital: 'Harrisburg',
      region: 'Northeast'
    },
    {
      name: 'Rhode Island',
      population: 1052931,
      capital: 'Providence',
      region: 'Northeast'
    },
    {
      name: 'South Carolina',
      population: 4625401,
      capital: 'Columbia',
      region: 'South'
    },
    {
      name: 'South Dakota',
      population: 814191,
      capital: 'Pierre',
      region: 'Midwest'
    },
    {
      name: 'Tennessee',
      population: 6346275,
      capital: 'Nashville',
      region: 'South'
    },
    { name: 'Texas', population: 25146105, capital: 'Austin', region: 'South' },
    {
      name: 'Utah',
      population: 2763888,
      capital: 'Salt Lake City',
      region: 'West'
    },
    {
      name: 'Vermont',
      population: 625745,
      capital: 'Montpelier',
      region: 'Northeast'
    },
    {
      name: 'Virginia',
      population: 8001045,
      capital: 'Richmond',
      region: 'South'
    },
    {
      name: 'Washington',
      population: 6724543,
      capital: 'Olympia',
      region: 'West'
    },
    {
      name: 'West Virginia',
      population: 1853011,
      capital: 'Charleston',
      region: 'South'
    },
    {
      name: 'Wisconsin',
      population: 5687289,
      capital: 'Madison',
      region: 'West'
    },
    { name: 'Wyoming', population: 563767, capital: 'Cheyenne', region: 'West' }
  ];

  const {
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    accept: 'image/jpeg, image/png'
  });

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

  return (
    <>
      <Button onClick={toggleModal} color="primary">
        <span className="btn-wrapper--icon">
          <FontAwesomeIcon icon={['fas', 'plus']} />
        </span>
        <span className="btn-wrapper--label">Create Product</span>
      </Button>

      <Modal
        size="lg"
        centered
        isOpen={modal}
        zIndex={1300}
        toggle={toggleModal}
        contentClassName="border-0 bg-white">
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

          <Input placeholder="Product title..." type="text" bsSize="lg" />
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
          <div className="font-weight-bold font-size-lg">Tags</div>

          <p className="font-size-sm text-black-50">
            Add some tags for this product from existing ones
          </p>

          <Typeahead
            id="typeID2"
            labelKey="name"
            multiple={true}
            defaultSelected={options.slice(0, 2)}
            options={options}
            placeholder="Choose a state..."
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
          <Button color="success" className="font-weight-bold">
            Save now
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ProductsPageTitleActions;
