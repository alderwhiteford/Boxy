import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function UserRegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [username, setUsername] = useState("");
  const [driversLicensePhoto, setDriversLicensePhoto] = useState("");
  const session = useSession();

  const router = useRouter();

  async function handleSubmit(event: any) {
    console.log("FAM");
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = {
      name,
      email,
      phone_number: phoneNumber,
      drivers_license_photo: driversLicensePhoto,
      username,
      password,
    };

    console.log(formData);

    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 m-2">
      <div className="w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0 mt-32">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John Doe"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="Username"
                id="username"
                placeholder="Johndoe123"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone-number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone number
              </label>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                placeholder="123-456-7890"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                value={phoneNumber}
                onChange={(event) =>
                  setPhoneNumber(parseInt(event.target.value))
                }
                required
              />
            </div>
            {/* <div>
                <label
                  htmlFor="drivers-license-photo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Driver's License Photo
                </label>
                <input
                  type="file"
                  name="drivers-license-photo"
                  id="drivers-license-photo"
                  accept=".jpg,.jpeg,.png"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  onChange={(event) =>
                    setDriversLicensePhoto(event.target.files[0])
                  }
                  required
                />
              </div> */}

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#097275] hover:bg-[#0a3739] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              onClick={() =>
                router.push("http://localhost:3000/listings/browse")
              }
            >
              Create an account
            </button>
            <p className="text-sm font-light text-gray-500">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-primary-600 hover:underline"
              >
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
