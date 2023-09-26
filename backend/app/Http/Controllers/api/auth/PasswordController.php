<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;

class PasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users'
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

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $response = [
                'status' => 'fail',
                'message' => 'This e-mail address isn\'t registered to our database'
            ];

            return response($response, 200);
        }

        $status = Password::sendResetLink($request->only('email'));
        if ($status == Password::RESET_LINK_SENT) {
            $response = [
                'status' => 'success',
                'message' => 'A password reset link has been sent to your e-mail address'
            ];

            return response($response, 200);
        }

        throw ValidationException::withMessages([
            'email' => [trans($status)]
        ]);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed'

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

        // $status = Password::reset(
        //     $request->only('email','password','password_confirmation','token'),
        //     function ($user) use($request) {
        //         $user->forceFill([
        //             'password' => $request->password,
        //             'remember_token' =>Str::random(60)
        //         ])->save();

        //         $user()->tokens()->delete();
        //         event(new PasswordReset($user));
        //     }
        // );

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => $password
                ])->setRememberToken(Str::random(60));

                $user->save();
                // $user()->tokens()->delete();
                event(new PasswordReset($user));
            }
        );


        if ($status == Password::PASSWORD_RESET) {
            $response = [
                'status' => 'success',
                'message' => 'Password reset successfully'
            ];

            return response($response, 200);
        } else {
            $response = [
                'status' => 'fail',
                'message' => 'There was an issue while resetting your password'
            ];

            return response($response, 200);
        }
    }
    private function errorMessages()
    {
        return [
            'token.required' => 'Invalid token applied',
            'email.required' => 'Your Email Please',
            'email.email' => 'Valid Email Please',
            'email.exists' => 'We can\'t find this email in our database',
            'password.required' => 'Password please',
            'password.min'   => 'Minimum :min characters password',
            'form.password.confirmed'   => 'Two passwords does not match',
            'form.agree.required' => 'You must agree the terms',
        ];
    }
}
