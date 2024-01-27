import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Button,
	StyleSheet,
	Text,
	View,
} from "react-native";
import {
	GoogleSignin,
	GoogleSigninButton,
	User as GoogleUser,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import * as Network from "expo-network";

interface GoogleSignInError extends Error {
	code?: string;
}

export const GoogleAuth = () => {
	const [error, setError] = useState<Error | unknown>(null);
	const [userInfo, setUserInfo] = useState<GoogleUser | null>(null);
	const [networkState, setNetworkState] =
		useState<Network.NetworkState | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const configureGoogleSignin = () => {
		GoogleSignin.configure({
			webClientId: process.env.GOOGLE_SIGNIN_WEB_CLIENT_ID,
		});
	};

	useEffect(() => {
		configureGoogleSignin();
		checkNetwork();
	}, []);

	const checkNetwork = async () => {
		const state = await Network.getNetworkStateAsync();
		setNetworkState(state);
	};

	useEffect(() => {
		console.log(userInfo);
		console.log(error);
	}, [userInfo, error]);

	const handleSignIn = async () => {
		if (!networkState?.isConnected) {
			alert(
				"No internet connection. Please check your network and try again!"
			);
			return;
		}

		try {
			setIsLoading(true);

			await GoogleSignin.hasPlayServices({
				showPlayServicesUpdateDialog: true,
			});

			const tempUserInfo = await GoogleSignin.signIn();
			setUserInfo(tempUserInfo);
			setError(null);
		} catch (e) {
			if (e instanceof Error) {
				const signInError = e as GoogleSignInError;
				handleSignInError(signInError);
			} else {
				console.error("Error during Google Sign-In", e);
				alert("Error during Google Sign-In");
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleSignInError = (error: GoogleSignInError) => {
		switch (error.code) {
			case statusCodes.SIGN_IN_CANCELLED:
				alert("Sign-In cancelled");
				break;
			case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
				alert(
					"Google Play Services are required for Google Sign-In and are not available on this device. Please install or update Google Play Services and try again."
				);
			default:
				console.error("Google Sign-In Error", error);
				break;
		}
	};

	const logout = () => {
		setUserInfo(null);
		GoogleSignin.revokeAccess();
		GoogleSignin.signOut();
	};

	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on youssr sapp!</Text>
			{isLoading ? (
				<ActivityIndicator
					size='large'
					color='#0000ff'
				/>
			) : userInfo ? (
				<Button
					title='Logout'
					onPress={logout}
				/>
			) : (
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Standard}
					onPress={handleSignIn}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});