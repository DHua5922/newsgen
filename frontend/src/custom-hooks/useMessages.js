function useMessages(success, error, isPending, pendingMessage) {
    return {
        success,
        error,
        pending: {
            isPending,
            message: pendingMessage 
        }
    };
}

export default useMessages;