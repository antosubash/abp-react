import React, { useState, Fragment } from "react";
import DialogWrapper from "../Shared/DialogWrapper";
type Props = {};

const TenantCreate = (props: Props) => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="float-right">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          New Tenant
        </button>
      </div>
      <DialogWrapper isOpen={isOpen} title="Create tenant" onClose={closeModal}>
        <form>
          <div className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="Enter your tenant name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="yourmail@provider.com"
              />
            </div>

            <div>
              <label
                htmlFor="job"
                className="text-sm text-gray-700 block mb-1 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                placeholder="password"
              />
            </div>
          </div>

          <div className="space-x-4 mt-8 float-right">
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </DialogWrapper>
    </>
  );
};

export default TenantCreate;
