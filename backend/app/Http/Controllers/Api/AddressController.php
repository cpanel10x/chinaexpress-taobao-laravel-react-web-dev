<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content\Frontend\Address;
use App\Traits\ApiResponser;
use Illuminate\Support\Facades\Validator;

/**
 * Class HomeController.
 */
class AddressController extends Controller
{
  use ApiResponser;


  public function AllAddress()
  {
    $address = Address::where('user_id', auth()->id())->latest()->get();
    return response([
      'address' => $address,
    ]);
  }

  public function StoreNewAddress()
  {
    $validator = Validator::make(request()->all(), [
      'name' => 'required|string|max:255',
      'phone' => 'required|string|max:191',
      'city' => 'required|string|max:191',
      'address' => 'required|string|max:600',
    ]);
    if ($validator->fails()) {
      return response(['status' => false, 'errors' => $validator->errors()]);
    }

    $user = auth()->user();
    $id = request('id');
    $data = [
      'name' => request('name'),
      'phone' => request('phone'),
      'city' => request('city'),
      'address' => request('address'),
      'user_id' => auth()->id(),
    ];

    if ($id) {
      $address = Address::find($id);
      $address->update($data);
    } else {
      $address = Address::create($data);
    }

    if ($user) {
      $updateData['shipping_id'] =  $address->id;
      if (!$user->name) {
        $updateData['name'] =  $address->name;
      }
      $user->update($updateData);
    }

    return response([
      'status' => true,
      'msg' => 'Address updated successfully'
    ]);
  }

  public function deleteAddress()
  {
    $id = request('id');
    $status = false;
    $msg = 'Address deleting failed';
    if ($id) {
      $address = Address::find($id);
      if ($address) {
        $status = true;
        $msg = 'Address deleted successfully';
        $address->delete();
      }
    }
    return response([
      'status' => $status,
      'msg' => $msg
    ]);
  }
}
