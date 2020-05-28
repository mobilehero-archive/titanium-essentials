'use strict';
const feedback = {};
module.exports = feedback;

const FEEDBACK_ENABLED = false;

feedback.selection = () => {
	if (FEEDBACK_ENABLED && OS_IOS) {
		const generator = Ti.UI.iOS.createFeedbackGenerator({ type: Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_SELECTION  });
		generator.prepare();
		generator.selectionChanged();
	}
};

feedback.error = () => {
	if (FEEDBACK_ENABLED && OS_IOS) {
		const generator = Ti.UI.iOS.createFeedbackGenerator({ type: Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_NOTIFICATION  });
		generator.prepare();
		generator.notificationOccurred(Titanium.UI.iOS.FEEDBACK_GENERATOR_NOTIFICATION_TYPE_ERROR);
	}
};

feedback.success = () => {
	if (FEEDBACK_ENABLED && OS_IOS) {
		const generator = Ti.UI.iOS.createFeedbackGenerator({ type: Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_NOTIFICATION  });
		generator.prepare();
		generator.notificationOccurred(Titanium.UI.iOS.FEEDBACK_GENERATOR_NOTIFICATION_TYPE_SUCCESS);
	}
};

feedback.warning = () => {
	if (FEEDBACK_ENABLED && OS_IOS) {
		const generator = Ti.UI.iOS.createFeedbackGenerator({ type: Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_NOTIFICATION  });
		generator.prepare();
		generator.notificationOccurred(Titanium.UI.iOS.FEEDBACK_GENERATOR_NOTIFICATION_TYPE_WARNING);
	}
};

feedback.heavy = () => {
	if (FEEDBACK_ENABLED && OS_IOS) {
		const generator = Ti.UI.iOS.createFeedbackGenerator({
			type:  Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_IMPACT,
			style: Titanium.UI.iOS.FEEDBACK_GENERATOR_IMPACT_STYLE_HEAVY,
		});
		generator.prepare();
		generator.impactOccurred();
	}
};

feedback.light = () => {
	if (FEEDBACK_ENABLED && OS_IOS) {
		const generator = Ti.UI.iOS.createFeedbackGenerator({
			type:  Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_IMPACT,
			style: Titanium.UI.iOS.FEEDBACK_GENERATOR_IMPACT_STYLE_LIGHT,
		});
		generator.prepare();
		generator.impactOccurred();
	}
};

feedback.medium = () => {
	if (FEEDBACK_ENABLED && OS_IOS) {
		const generator = Ti.UI.iOS.createFeedbackGenerator({
			type:  Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_IMPACT,
			style: Titanium.UI.iOS.FEEDBACK_GENERATOR_IMPACT_STYLE_MEDIUM,
		});
		generator.prepare();
		generator.impactOccurred();
	}
};
