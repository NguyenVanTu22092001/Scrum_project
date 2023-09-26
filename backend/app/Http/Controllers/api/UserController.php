<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function user()
    {
        $user = Auth::user();
        $response = [
            'status' => 'success',
            'data' => [
                'user' => $user
            ]
        ];
        return response($response, 200);
    }

    public function getUser(Request $request, $id)
    {

        $user = User::find($id);
        if (!$user) {
            $response = [
                'status' => 'fail',
                'message' => 'This user isn\'t registered to our database'
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 'success',
            'data' => [
                'user' => $user
            ]
        ];
        return response($response, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email|unique:users,email,' . Auth::id(),
            'phone' => 'required'
        ], $this->errorMessages());

        if ($validator->fails()) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'error' => $errors = $validator->errors()
                ]
            ];

            return response($response, 200);
        }

        $update = User::where('id', Auth::id())->update($request->all());

        if (!$update) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'Unknown error'
                ]
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 'success',
            'data' => Auth::user()
        ];
        return response($response, 200);
    }

    private function errorMessages()
    {
        return [
            'first_name.required' => 'Please enter your first name',
            'last_name.required' => 'Please enter your last name',
            'email.required' => 'Please enter your e-mail address',
            'email.email' => 'Invalid e-mail address',
            'email.unique' => 'This e-mail address is already in use',
            'password.required' => 'Please enter your password',
            'password.min'   => 'Password requires a minimum of :min characters',
            'form.password.confirmed'   => 'The entered passwords do not match',
            'form.agree.required' => 'You must agree to the terms and conditions to proceed',
        ];
    }
}
