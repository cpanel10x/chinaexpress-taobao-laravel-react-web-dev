<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Content\Frontend\Address;
use App\Traits\ApiResponser;

/**
 * Class HomeController.
 */
class AddressController extends Controller
{
  use ApiResponser;


  public function AllAddress()
  {
    $addresses = Address::where('user_id', auth()->id())->latest()->get();
    return response([
      'addresses' => $addresses,
    ]);
  }

  public function StoreNewAddress()
  {
    $user = auth()->user();
    $id = request('id');
    $data = [
      'name' => request('name'),
      'phone' => request('phone'),
      'city' => request('district'),
      'address' => request('address'),
      'user_id' => auth()->id(),
    ];

    if ($id) {
      $address = Address::find($id);
      if ($address) {
        $address->update($data);
      }
    } else {
      $address = Address::create($data);
      $user->update(['shipping_id' => $address->id]);
    }

    if ($user) {
      if (!$user->name) {
        $user->update(['name' => $address->name]);
      }
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
    $addresses = Address::where('user_id', auth()->id())->latest()->get();
    return response([
      'status' => $status,
      'addresses' => $addresses,
      'msg' => $msg
    ]);
  }
}
