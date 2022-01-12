FROM reactnativecommunity/react-native-android:2.1 as builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . .

WORKDIR /app/android
RUN ./gradlew assembleRelease

FROM busybox

VOLUME "/opt"
COPY --from=builder /app/android/app/build/outputs/apk/release/app-release.apk /opt/client.apk

CMD [ "echo", "application built." ]