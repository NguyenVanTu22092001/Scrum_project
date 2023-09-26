<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use  Gloudemans\Shoppingcart\Facades\Cart as Cart;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $id = $request->id;
        $quantity = $request->quantity;
        $supplement = $request->supplement;

        $product = Product::findOrFail($id);

        if ($product) {
            Cart::add($product->id, $product->title, $quantity, ($product->price / 100), 1, []);
        }
        $response = [
            'status' => 'success',
            'data' => [
                'cart' => $this->getCartContent()
            ]
        ];
        return response($response, 200);
    }
    public function update(Request $request)
    {
        $rowId = $request->rowId;
        $quantity = $request->quantity;

        $row = Cart::get($rowId);
        $qty = $row->qty + $quantity;
        Cart::update($rowId, $qty);
        $response = [
            'status' => 'success'
        ];
        return response($response, 200);
    }

    public function clear()
    {
        Cart::destroy();
    }

    public function remove(Request $request)
    {
        $rowId = $request->rowId;
        Cart::remove($rowId);
        $response = [
            'status' => 'success'
        ];
        return response($response, 200);
    }

    public function cart()
    {
        $cartData = array(
            'quantity' => Cart::count(),
            'subTotal' => Cart::subtotal(),
            'cartItems' => $this->getCartContent()
        );
        $response = [
            'status' => 'success',
            'data' => [
                'cart' => $cartData
            ]
        ];
        return response($response, 200);
    }

    private function getCartContent()
    {
        return Cart::content();
    }
}
