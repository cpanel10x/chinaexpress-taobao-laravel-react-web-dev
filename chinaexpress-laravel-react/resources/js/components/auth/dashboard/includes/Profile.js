import React from 'react';

const Profile = (props) => {

  const user = {};

   return (
      <div className="card">
         <div className="card-header border border-bottom-0 p-4">
            <h4 className="card-title">Profile Information</h4>
         </div>
         <div className="card-body border p-4 mb-3">
            <table className="table">
               <tbody>
               <tr>
                  <th>Name:</th>
                  <td>{user.name}</td>
               </tr>
               <tr>
                  <th>Phone:</th>
                  <td>{user.phone || 'Add Phone'}</td>
               </tr>
               <tr>
                  <th>Email:</th>
                  <td>{user.email}</td>
               </tr>
               </tbody>
            </table>

            <button type="button" className="btn btn-default">Update information</button>

         </div>
      </div>
   );
};



export default  Profile;
